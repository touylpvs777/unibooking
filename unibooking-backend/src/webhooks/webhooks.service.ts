import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BookingStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { FintinkMockWebhookDto } from './dto/fintink-mock-webhook.dto';

@Injectable()
export class WebhooksService {
  private readonly logger = new Logger(WebhooksService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Simulates the Lao Digital Tourism Insurance ("LUD") settlement partner
   * FinTink confirming a payment -- there is no real FinTink integration.
   * The production gate lives in WebhooksController (first line of the
   * handler); this only runs at all in development/staging.
   *
   * Mirrors PaymentsService.applyPaymentEvent's guarded updateMany (see that
   * file): scoping the update to `status: PENDING` makes this idempotent
   * against a duplicate click and never re-confirms a booking the expiry
   * cron already cancelled out from under it. Unlike the real gateway path,
   * this deliberately does not touch the Payment row -- it's a UI/E2E
   * smoke-test hook for the booking-status + outbox-event side, not a
   * stand-in for the payments reconciliation flow.
   */
  async handleFintinkMock(dto: FintinkMockWebhookDto): Promise<{ received: boolean }> {
    const booking = await this.prisma.booking.findUnique({
      where: { id: dto.bookingId },
    });
    if (!booking) {
      throw new NotFoundException(`Booking with id "${dto.bookingId}" not found.`);
    }

    await this.prisma.booking.updateMany({
      where: { id: dto.bookingId, status: BookingStatus.PENDING },
      data: { status: BookingStatus.CONFIRMED },
    });

    // Stands in for a real outbox-pattern publish (e.g. to the LUD
    // insurance settlement queue) -- there is no outbox table/worker yet,
    // so this log line is the observable effect for now.
    this.logger.log(
      `[OUTBOX EVENT] Type: LUD_INSURANCE_SYNC, BookingID: ${dto.bookingId}, Status: PENDING_T1_SETTLEMENT`,
    );

    return { received: true };
  }
}
