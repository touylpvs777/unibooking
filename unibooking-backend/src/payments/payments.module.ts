import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { StripeGateway } from './gateways/stripe.gateway';
import { LaoQrGateway } from './gateways/lao-qr.gateway';
import { PAYMENT_GATEWAYS, PaymentGateway } from './gateways/payment-gateway.interface';

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    StripeGateway,
    LaoQrGateway,
    // A method -> gateway lookup so PaymentsService/PaymentsController
    // never switch on `dto.method` themselves -- adding a third gateway
    // later is: implement PaymentGateway, add it to this array. Nothing
    // else in the module changes.
    {
      provide: PAYMENT_GATEWAYS,
      useFactory: (
        stripe: StripeGateway,
        laoQr: LaoQrGateway,
      ): Map<string, PaymentGateway> =>
        new Map<string, PaymentGateway>([
          [stripe.method, stripe],
          [laoQr.method, laoQr],
        ]),
      inject: [StripeGateway, LaoQrGateway],
    },
  ],
  // BookingsService needs refundPayment() for cancel-with-refund -- see
  // BookingsModule's imports.
  exports: [PaymentsService],
})
export class PaymentsModule {}
