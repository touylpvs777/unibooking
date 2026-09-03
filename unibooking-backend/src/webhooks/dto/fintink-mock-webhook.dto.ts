import { IsIn, IsUUID } from 'class-validator';

export const FINTINK_MOCK_STATUSES = ['SUCCESS'] as const;
export type FintinkMockStatus = (typeof FINTINK_MOCK_STATUSES)[number];

export class FintinkMockWebhookDto {
  @IsUUID()
  bookingId!: string;

  @IsIn(FINTINK_MOCK_STATUSES)
  status!: FintinkMockStatus;
}
