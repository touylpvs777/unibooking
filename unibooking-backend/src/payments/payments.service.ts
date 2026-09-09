import { randomBytes } from 'crypto';
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { BookingStatus, PaymentStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import {
  NormalizedPaymentEvent,
  PAYMENT_GATEWAYS,
  PaymentGateway,
} from './gateways/payment-gateway.interface';
import type { JwtPayload } from '../auth/strategies/jwt.strategy';

export interface CheckoutSession {
  checkoutUrl?: string;
  qrCodeData?: string;
  qrCodeImageUrl?: string;
  transactionId: string;
  bookingId: string;
  amount: number;
}

function generateTransactionId(): string {
  return `TXN-${randomBytes(8).toString('hex').toUpperCase()}`;
}

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(PAYMENT_GATEWAYS)
    private readonly gateways: Map<string, PaymentGateway>,
  ) {}

  private getGateway(method: string): PaymentGateway {
    const gateway = this.gateways.get(method);
    if (!gateway) {
      throw new BadRequestException(`Unsupported payment method "${method}".`);
    }
    return gateway;
  }

  /**
   * Creates (or re-creates, on a retried checkout) a real gateway session
   * for a booking. Structurally unchanged from the original mock: create/
   * reuse a Payment row, hand the caller a session minted by whichever
   * gateway `dto.method` selects.
   */
  async createCheckoutSession(
    dto: CreateCheckoutDto,
    user: JwtPayload,
  ): Promise<CheckoutSession> {
    const booking = await this.prisma.booking.findUnique({
      where: { id: dto.bookingId },
    });

    if (!booking) {
      throw new NotFoundException(
        `Booking with id "${dto.bookingId}" not found.`,
      );
    }
    if (booking.userId !== user.sub) {
      throw new ForbiddenException('This booking does not belong to you.');
    }
    if (booking.status !== BookingStatus.PENDING) {
      throw new BadRequestException(
        `Booking is ${booking.status.toLowerCase()} and can no longer be paid for.`,
      );
    }
    if (booking.expiresAt <= new Date()) {
      throw new BadRequestException(
        "This booking's hold has expired -- please create a new booking.",
      );
    }

    const gateway = this.getGateway(dto.method);
    const transactionId = generateTransactionId();
    const amount = Number(booking.totalPrice);

    const session = await gateway.createCheckout({
      booking,
      amount,
      transactionId,
    });

    // upsert, not create: a customer re-opening an abandoned checkout hits
    // the same Payment row (bookingId is @unique on Payment) instead of a
    // P2002 unique-constraint error on a second attempt. Also lets a
    // customer switch payment method on retry -- `method` is overwritten.
    await this.prisma.payment.upsert({
      where: { bookingId: booking.id },
      create: {
        bookingId: booking.id,
        transactionId: session.transactionId,
        amount: booking.totalPrice,
        method: dto.method,
        status: PaymentStatus.PENDING,
      },
      update: {
        transactionId: session.transactionId,
        method: dto.method,
        status: PaymentStatus.PENDING,
      },
    });

    return {
      checkoutUrl: session.checkoutUrl,
      qrCodeData: session.qrCodeData,
      qrCodeImageUrl: session.qrCodeImageUrl,
      transactionId: session.transactionId,
      bookingId: booking.id,
      amount,
    };
  }

  /**
   * Lets the frontend poll a QR-based checkout for completion instead of
   * (or alongside) a webhook -- QR flows confirm on the customer's phone,
   * away from the browser that opened checkout, so there's no redirect to
   * carry a result back the way Stripe's success_url does.
   */
  async getPaymentStatus(
    bookingId: string,
    user: JwtPayload,
  ): Promise<{ bookingStatus: BookingStatus; paymentStatus: PaymentStatus | null }> {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { payment: true },
    });
    if (!booking) {
      throw new NotFoundException(`Booking with id "${bookingId}" not found.`);
    }
    if (booking.userId !== user.sub) {
      throw new ForbiddenException('This booking does not belong to you.');
    }

    return {
      bookingStatus: booking.status,
      paymentStatus: booking.payment?.status ?? null,
    };
  }

  /** Verifies the gateway's signature over the raw request body, then applies the resulting event through the shared confirm/fail logic below. */
  async handleGatewayWebhook(
    method: string,
    rawBody: Buffer,
    headers: Record<string, string | string[] | undefined>,
  ): Promise<{ received: boolean }> {
    const gateway = this.getGateway(method);
    const event = gateway.verifyWebhook(rawBody, headers);

    if (event.status === 'ignored') {
      return { received: true };
    }

    return this.applyPaymentEvent(event);
  }

  /**
   * The webhook is the one place a payment becomes real, and it runs
   * completely independently of the Phase 04.5 cron sweep -- so the two
   * can race for the same row. The conditional `updateMany` below IS the
   * guard: Postgres serializes concurrent writes to the same booking row,
   * so this can only confirm a booking the cron hasn't already cancelled a
   * moment earlier.
   *
   * When it affects 0 rows, two genuinely different situations look
   * identical from the update alone, so a follow-up read distinguishes
   * them:
   *  - booking already CONFIRMED -> a duplicate webhook delivery (gateways
   *    retry by design) -- idempotent no-op, not an error.
   *  - booking CANCELLED (or anything else non-PENDING) -> the cron won
   *    the race and already released this booking's inventory. Money has
   *    now arrived for a slot that may belong to someone else's booking.
   *    Re-confirming here would risk a second, silent double-booking on
   *    top of the first race, so this deliberately does NOT flip the
   *    booking back -- it's logged as a critical, actionable error for
   *    manual refund instead of thrown, so a well-behaved gateway doesn't
   *    read a 4xx/5xx as "retry me" for a case retrying can never fix.
   */
  private async applyPaymentEvent(
    event: NormalizedPaymentEvent,
  ): Promise<{ received: boolean }> {
    const bookingId = await this.resolveBookingId(event);

    if (event.status === 'failed') {
      await this.prisma.payment.updateMany({
        where: { bookingId },
        data: { status: PaymentStatus.FAILED },
      });
      this.logger.warn(`Payment failed for booking ${bookingId}.`);
      return { received: true };
    }

    await this.prisma.$transaction(async (tx) => {
      const confirmed = await tx.booking.updateMany({
        where: { id: bookingId, status: BookingStatus.PENDING },
        data: { status: BookingStatus.CONFIRMED },
      });

      if (confirmed.count === 1) {
        await tx.payment.updateMany({
          where: { bookingId },
          data: {
            status: PaymentStatus.SUCCESS,
            ...(event.transactionId && { transactionId: event.transactionId }),
          },
        });
        return;
      }

      const booking = await tx.booking.findUnique({ where: { id: bookingId } });
      if (!booking) {
        this.logger.error(`Webhook referenced unknown booking ${bookingId}.`);
        return;
      }

      if (booking.status === BookingStatus.CONFIRMED) {
        this.logger.warn(
          `Duplicate success webhook for already-confirmed booking ${bookingId}.`,
        );
        await tx.payment.updateMany({
          where: { bookingId },
          data: {
            status: PaymentStatus.SUCCESS,
            ...(event.transactionId && { transactionId: event.transactionId }),
          },
        });
        return;
      }

      await tx.payment.updateMany({
        where: { bookingId },
        data: { status: PaymentStatus.FAILED },
      });
      this.logger.error(
        `CRITICAL: payment succeeded for booking ${bookingId} (status=${booking.status}) ` +
          'after its hold had already expired and inventory was released. Funds must be ' +
          'refunded manually -- the booking was NOT re-confirmed, to avoid a double-booking.',
      );
    });

    return { received: true };
  }

  /**
   * Called from BookingsService.cancelBooking for a CONFIRMED (paid)
   * booking, before it flips the booking to CANCELLED. Deliberately takes
   * no `user` -- ownership was already checked there, and this also has to
   * run for an ADMIN cancelling someone else's booking.
   *
   * Errors are deliberately NOT caught here -- StripeGateway.refund already
   * catches the raw Stripe SDK error and rethrows a clean BadRequestException
   * (see that file), and letting it propagate out of this method is what
   * stops BookingsService.cancelBooking before it touches the DB. Swallowing
   * it here instead would be the actual bug this design avoids: the booking
   * would end up CANCELLED (inventory released) even though the refund
   * never happened.
   */
  async refundPayment(bookingId: string): Promise<void> {
    const payment = await this.prisma.payment.findUnique({
      where: { bookingId },
    });

    if (!payment) {
      // e.g. this booking was confirmed through the dev-only FinTink mock
      // webhook, which never creates a Payment row (see WebhooksService) --
      // nothing on file to refund through a real gateway.
      this.logger.warn(
        `No payment on file for booking ${bookingId} -- nothing to refund.`,
      );
      return;
    }

    if (payment.status !== PaymentStatus.SUCCESS) {
      this.logger.warn(
        `Payment ${payment.id} for booking ${bookingId} is ${payment.status}, not SUCCESS -- skipping refund.`,
      );
      return;
    }

    const gateway = this.getGateway(payment.method);
    await gateway.refund(payment);

    await this.prisma.payment.update({
      where: { bookingId },
      data: { status: PaymentStatus.REFUNDED },
    });
  }

  /** Prefers an explicit bookingId; otherwise resolves it via the Payment row the gateway's transactionId points back to. */
  private async resolveBookingId(event: NormalizedPaymentEvent): Promise<string> {
    if (event.bookingId) {
      return event.bookingId;
    }
    if (event.transactionId) {
      const payment = await this.prisma.payment.findUnique({
        where: { transactionId: event.transactionId },
      });
      if (!payment) {
        throw new NotFoundException(
          `No payment found for transactionId "${event.transactionId}".`,
        );
      }
      return payment.bookingId;
    }
    throw new BadRequestException(
      'Webhook event carried neither a transactionId nor a bookingId.',
    );
  }
}
