import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Payment } from '@prisma/client';
import Stripe from 'stripe';
import {
  CreateCheckoutParams,
  NormalizedPaymentEvent,
  PaymentGateway,
  PaymentGatewaySession,
  PaymentMethod,
  RefundResult,
} from './payment-gateway.interface';

/**
 * International card payments via Stripe Checkout (hosted payment page --
 * no card data ever touches this server, so there's no PCI-DSS SAQ-D
 * burden here). Needs three env vars to actually work:
 *   STRIPE_SECRET_KEY     -- sk_test_... / sk_live_...
 *   STRIPE_WEBHOOK_SECRET -- whsec_..., from `stripe listen` locally or the
 *                            Dashboard's webhook endpoint once deployed
 *   STRIPE_SUCCESS_URL / STRIPE_CANCEL_URL -- absolute frontend URLs Stripe
 *                            redirects the browser back to
 * Until STRIPE_SECRET_KEY is set this throws on the first real use rather
 * than silently no-op'ing, so a missing config fails loudly at checkout
 * time instead of pretending to work.
 */
@Injectable()
export class StripeGateway implements PaymentGateway {
  readonly method: PaymentMethod = 'STRIPE_CARD';

  private readonly logger = new Logger(StripeGateway.name);
  private stripeClient: Stripe | null = null;

  constructor(private readonly config: ConfigService) {}

  private get stripe(): Stripe {
    if (!this.stripeClient) {
      const secretKey = this.config.get<string>('STRIPE_SECRET_KEY');
      if (!secretKey) {
        throw new BadRequestException(
          'Card payments are not configured yet -- set STRIPE_SECRET_KEY.',
        );
      }
      this.stripeClient = new Stripe(secretKey);
    }
    return this.stripeClient;
  }

  async createCheckout(
    params: CreateCheckoutParams,
  ): Promise<PaymentGatewaySession> {
    const successUrl = this.config.getOrThrow<string>('STRIPE_SUCCESS_URL');
    const cancelUrl = this.config.getOrThrow<string>('STRIPE_CANCEL_URL');

    // Amount is booking.totalPrice, which is LAK (Lao Kip) -- Stripe's
    // smallest-unit rule only applies to currencies with decimal
    // subunits (USD cents, etc). LAK has none, so `unit_amount` is the
    // whole-Kip integer as-is, not multiplied by 100. If this ever needs
    // to charge in USD instead, that multiplication has to come back.
    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      client_reference_id: params.booking.id,
      success_url: `${successUrl}?bookingId=${params.booking.id}`,
      cancel_url: `${cancelUrl}?bookingId=${params.booking.id}`,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'lak',
            unit_amount: Math.round(params.amount),
            product_data: {
              name: `UniBooking -- ${params.booking.bookingReference}`,
            },
          },
        },
      ],
      metadata: {
        bookingId: params.booking.id,
        transactionId: params.transactionId,
      },
      // Copies the same metadata onto the underlying PaymentIntent, not
      // just the Session -- payment_intent.payment_failed events carry a
      // PaymentIntent object, not a Session, so without this the failure
      // path below would have no bookingId/transactionId to resolve.
      payment_intent_data: {
        metadata: {
          bookingId: params.booking.id,
          transactionId: params.transactionId,
        },
      },
    });

    if (!session.url) {
      throw new BadRequestException(
        'Stripe did not return a checkout URL for this session.',
      );
    }

    return {
      checkoutUrl: session.url,
      transactionId: params.transactionId,
    };
  }

  verifyWebhook(
    rawBody: Buffer,
    headers: Record<string, string | string[] | undefined>,
  ): NormalizedPaymentEvent {
    const signature = headers['stripe-signature'];
    const webhookSecret = this.config.getOrThrow<string>(
      'STRIPE_WEBHOOK_SECRET',
    );

    if (!signature || Array.isArray(signature)) {
      throw new BadRequestException('Missing Stripe-Signature header.');
    }

    // Throws Stripe.errors.StripeSignatureVerificationError on any mismatch
    // -- Nest's default exception filter turns that into a 500, which is
    // fine here: a bad signature means either a misconfigured webhook
    // secret or a spoofed request, neither of which is the caller's to
    // retry, so there's no need for special-case 4xx handling.
    const event = this.stripe.webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret,
    );

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const paymentIntentId =
          typeof session.payment_intent === 'string'
            ? session.payment_intent
            : session.payment_intent?.id;
        return {
          status: 'succeeded',
          // Stripe's own PaymentIntent id -- not our internally generated
          // transactionId -- so refund() below has something real to pass
          // to stripe.refunds.create({ payment_intent }). Falls back to our
          // own id only if Stripe ever omits payment_intent on a completed
          // payment-mode session, which shouldn't normally happen.
          // PaymentsService.applyPaymentEvent already overwrites
          // Payment.transactionId with whatever this returns once the
          // booking confirms.
          transactionId: paymentIntentId ?? session.metadata?.transactionId,
          bookingId: session.metadata?.bookingId ?? session.client_reference_id ?? undefined,
        };
      }
      case 'checkout.session.expired':
      case 'payment_intent.payment_failed': {
        const obj = event.data.object as
          | Stripe.Checkout.Session
          | Stripe.PaymentIntent;
        const metadata = 'metadata' in obj ? obj.metadata : undefined;
        return {
          status: 'failed',
          transactionId: metadata?.transactionId,
          bookingId: metadata?.bookingId,
        };
      }
      default:
        this.logger.debug(`Ignoring unhandled Stripe event: ${event.type}`);
        return { status: 'ignored' };
    }
  }

  /**
   * `payment.transactionId` is Stripe's real PaymentIntent id by this point
   * (see verifyWebhook's checkout.session.completed branch above) -- never
   * the transactionId this app originally generated for the checkout, which
   * only ever existed to correlate our own metadata.
   */
  async refund(payment: Payment): Promise<RefundResult> {
    if (!payment.transactionId) {
      throw new BadRequestException(
        'This payment has no Stripe payment_intent on file -- cannot refund.',
      );
    }

    try {
      const refund = await this.stripe.refunds.create({
        payment_intent: payment.transactionId,
      });
      return { refundId: refund.id, status: 'refunded' };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(
        `Stripe refund failed for payment ${payment.id} (payment_intent ${payment.transactionId}): ${message}`,
      );
      throw new BadRequestException(
        'The refund could not be processed by Stripe -- please try again or contact support.',
      );
    }
  }
}
