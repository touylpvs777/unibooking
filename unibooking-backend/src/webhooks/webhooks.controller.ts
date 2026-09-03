import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { FintinkMockWebhookDto } from './dto/fintink-mock-webhook.dto';

/**
 * Dev/QA-only mock of the Lao Digital Tourism Insurance ("LUD") settlement
 * partner FinTink's payment webhook -- there is no real FinTink
 * integration. This exists purely so a developer or an E2E test can flip a
 * booking to CONFIRMED and observe the LUD_INSURANCE_SYNC outbox log line
 * without a real payment gateway (contrast with the real, signature-verified
 * webhooks on PaymentsController).
 */
@Controller('api/webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post('fintink-mock')
  handleFintinkMock(@Body() dto: FintinkMockWebhookDto): Promise<{ received: boolean }> {
    // Must be the very first thing this handler does: this mock has no
    // signature verification (unlike the real gateways in PaymentsService),
    // so reaching it in production would let anyone mark any booking as
    // paid. 404, not 403 -- a prod caller shouldn't even learn the route
    // exists.
    if (process.env.NODE_ENV === 'production') {
      throw new NotFoundException();
    }

    return this.webhooksService.handleFintinkMock(dto);
  }
}
