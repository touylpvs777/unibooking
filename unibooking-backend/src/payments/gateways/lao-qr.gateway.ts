import { createHmac } from 'crypto';
import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Payment } from '@prisma/client';
import {
  CreateCheckoutParams,
  NormalizedPaymentEvent,
  PaymentGateway,
  PaymentGatewaySession,
  PaymentMethod,
  RefundResult,
} from './payment-gateway.interface';

/**
 * *** NOT a verified integration -- this is a structural placeholder. ***
 *
 * Unlike Stripe, Lao local payment channels (BCEL OnePay, LDB, Unitel
 * Money, or an aggregator fronting several of them) don't publish a
 * single self-serve developer API. The real endpoint URL, request/response
 * field names, auth headers, and webhook signature scheme are issued
 * directly by the bank/provider once you sign a merchant agreement --
 * they are NOT something to guess at, because a wrong field name here
 * would look like a working integration while silently failing (or worse,
 * silently succeeding against the wrong thing) with real money involved.
 *
 * What IS real below:
 *  - the PaymentGateway contract (createCheckout / verifyWebhook), so
 *    PaymentsService and the webhook routing don't change when the real
 *    provider is wired in;
 *  - config-driven base URL/credentials, so nothing is hardcoded;
 *  - an HMAC-SHA256 signed-request pattern, which is a common convention
 *    across this category of gateway (not specific to any one provider).
 *
 * To finish this once you have the provider's merchant integration guide:
 *  1. Replace the request body shape / header names in createCheckout()
 *     with whatever their guide specifies.
 *  2. Replace the signature verification in verifyWebhook() with their
 *     documented scheme (HMAC field name, hash algorithm, header vs. body
 *     signature -- providers vary).
 *  3. Delete this comment block once verified against their sandbox.
 *
 * Until LAO_GATEWAY_BASE_URL is set, createCheckout throws a clear 503
 * instead of pretending to produce a real QR code.
 */
@Injectable()
export class LaoQrGateway implements PaymentGateway {
  readonly method: PaymentMethod = 'LAO_QR_GATEWAY';

  private readonly logger = new Logger(LaoQrGateway.name);

  constructor(private readonly config: ConfigService) {}

  async createCheckout(
    params: CreateCheckoutParams,
  ): Promise<PaymentGatewaySession> {
    const baseUrl = this.config.get<string>('LAO_GATEWAY_BASE_URL');
    const merchantId = this.config.get<string>('LAO_GATEWAY_MERCHANT_ID');
    const apiKey = this.config.get<string>('LAO_GATEWAY_API_KEY');
    const secret = this.config.get<string>('LAO_GATEWAY_SECRET');

    if (!baseUrl || !merchantId || !apiKey || !secret) {
      throw new ServiceUnavailableException(
        'The Lao QR payment channel is not configured yet -- set ' +
          'LAO_GATEWAY_BASE_URL/MERCHANT_ID/API_KEY/SECRET once you have ' +
          "the provider's merchant integration guide (see lao-qr.gateway.ts).",
      );
    }

    // Placeholder canonical string + signature. Real providers commonly
    // sign `merchantId + orderId + amount + timestamp` (order and field
    // set vary) -- replace with their exact documented scheme.
    const orderId = params.transactionId;
    const timestamp = Date.now().toString();
    const canonical = `${merchantId}|${orderId}|${params.amount}|${timestamp}`;
    const signature = createHmac('sha256', secret)
      .update(canonical)
      .digest('hex');

    const response = await fetch(`${baseUrl}/v1/qr/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey,
      },
      body: JSON.stringify({
        merchantId,
        orderId,
        amount: params.amount,
        currency: 'LAK',
        timestamp,
        signature,
        // A callback the provider POSTs to on payment completion -- exact
        // param name (`notifyUrl`/`callbackUrl`/`webhookUrl`) per their docs.
        notifyUrl: this.config.get<string>('LAO_GATEWAY_WEBHOOK_URL'),
      }),
    });

    if (!response.ok) {
      this.logger.error(
        `Lao QR gateway rejected checkout creation: ${response.status} ${await response.text()}`,
      );
      throw new ServiceUnavailableException(
        'The Lao QR payment provider rejected this checkout request.',
      );
    }

    const body = (await response.json()) as {
      qrCodeData?: string;
      qrCodeImageUrl?: string;
      expiresAt?: string;
    };

    return {
      qrCodeData: body.qrCodeData,
      qrCodeImageUrl: body.qrCodeImageUrl,
      transactionId: params.transactionId,
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : undefined,
    };
  }

  verifyWebhook(
    rawBody: Buffer,
    headers: Record<string, string | string[] | undefined>,
  ): NormalizedPaymentEvent {
    const secret = this.config.get<string>('LAO_GATEWAY_SECRET');
    if (!secret) {
      throw new ServiceUnavailableException(
        'The Lao QR payment channel is not configured yet.',
      );
    }

    // Placeholder: signature delivered as a header, HMAC-SHA256 over the
    // raw body. Replace the header name and algorithm with whatever the
    // provider's webhook guide specifies -- some sign a subset of fields
    // instead of the raw body.
    const providedSignature = headers['x-signature'];
    const expectedSignature = createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    if (
      !providedSignature ||
      Array.isArray(providedSignature) ||
      providedSignature !== expectedSignature
    ) {
      throw new ServiceUnavailableException('Invalid webhook signature.');
    }

    const payload = JSON.parse(rawBody.toString('utf8')) as {
      orderId?: string;
      status?: string;
    };

    return {
      status: payload.status === 'SUCCESS' ? 'succeeded' : 'failed',
      transactionId: payload.orderId,
    };
  }

  /**
   * *** Not a real refund -- same placeholder status as the rest of this
   * file (see the header comment). There is no verified Lao QR provider
   * integration to call a refund API on, so this cannot move real money
   * back. Per product decision, cancelling a LAO_QR_GATEWAY booking still
   * proceeds (PaymentsService.refundPayment marks the Payment REFUNDED in
   * our own records regardless of this method's result) rather than
   * blocking cancellation on a gateway that isn't finished yet -- but the
   * actual refund has to be done manually until it is. This log line is
   * that handoff.
   */
  refund(payment: Payment): Promise<RefundResult> {
    this.logger.warn(
      `MANUAL REFUND REQUIRED: payment ${payment.id} (amount ${payment.amount.toString()} LAK, ` +
        `transactionId ${payment.transactionId}) was paid via LAO_QR_GATEWAY, which has no ` +
        'real refund API yet. Process the refund manually with the provider/bank.',
    );
    return Promise.resolve({ status: 'skipped' });
  }
}
