import { Booking, Payment } from '@prisma/client';

/**
 * One entry per selectable payment method on the frontend (checkout.vue's
 * `paymentOptions`). Extending to another local bank/wallet later just
 * means adding a new value here plus a new PaymentGateway implementation
 * registered in PaymentsModule -- PaymentsService and the webhook routing
 * don't change shape.
 */
export const PAYMENT_METHODS = ['STRIPE_CARD', 'LAO_QR_GATEWAY'] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const PAYMENT_GATEWAYS = 'PAYMENT_GATEWAYS';

export interface CreateCheckoutParams {
  booking: Booking;
  amount: number;
  transactionId: string;
}

/**
 * What PaymentsService hands back to the frontend after creating a
 * checkout. Exactly one of checkoutUrl / qrCodeData is populated depending
 * on the gateway: a redirect-based gateway (Stripe) sets checkoutUrl, a
 * QR-based one sets qrCodeData (and optionally a ready-made image URL if
 * the provider hosts the QR image itself instead of returning raw payload
 * text for the frontend to render).
 */
export interface PaymentGatewaySession {
  checkoutUrl?: string;
  qrCodeData?: string;
  qrCodeImageUrl?: string;
  transactionId: string;
  expiresAt?: Date;
}

/**
 * What every gateway's webhook is normalized down to before it reaches
 * PaymentsService's shared confirm/fail logic. `'ignored'` is for event
 * types the gateway sends that this integration doesn't act on (Stripe
 * fires many event types per checkout; only a couple matter here) -- the
 * controller acks 200 without touching a Booking/Payment row.
 */
export interface NormalizedPaymentEvent {
  status: 'succeeded' | 'failed' | 'ignored';
  transactionId?: string;
  bookingId?: string;
}

/**
 * Result of fully refunding whatever was captured for one Payment.
 * `'refunded'` means real money actually moved back to the customer through
 * the gateway; `'skipped'` is for a gateway with no real refund API to call
 * yet (see LaoQrGateway) -- PaymentsService.refundPayment still marks the
 * Payment row REFUNDED either way, since from this platform's point of view
 * the booking is being cancelled regardless of which gateway processed it.
 */
export interface RefundResult {
  refundId?: string;
  status: 'refunded' | 'skipped';
}

export interface PaymentGateway {
  readonly method: PaymentMethod;

  createCheckout(params: CreateCheckoutParams): Promise<PaymentGatewaySession>;

  /**
   * `rawBody` (not the parsed JSON body) because every real gateway signs
   * the exact bytes it sent -- re-serializing a parsed object rarely
   * reproduces byte-for-byte the same string, which silently breaks
   * signature verification. See main.ts's `rawBody: true` and each
   * controller webhook route's use of `@Req() req: RawBodyRequest<Request>`.
   */
  verifyWebhook(
    rawBody: Buffer,
    headers: Record<string, string | string[] | undefined>,
  ): NormalizedPaymentEvent;

  /**
   * Fully refunds whatever was captured for this payment. Only ever called
   * for a Payment already at SUCCESS (see PaymentsService.refundPayment) --
   * not responsible for updating Payment.status itself, the caller does
   * that once this resolves without throwing.
   */
  refund(payment: Payment): Promise<RefundResult>;
}
