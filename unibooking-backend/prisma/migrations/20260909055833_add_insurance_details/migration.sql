-- CreateEnum
CREATE TYPE "InsurancePlanTier" AS ENUM ('BASIC', 'STANDARD', 'PREMIUM');

-- CreateTable
CREATE TABLE "InsuranceDetails" (
    "serviceId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "planTier" "InsurancePlanTier" NOT NULL,
    "coverageAmount" DECIMAL(12,2) NOT NULL,
    "maxTripDurationDays" INTEGER NOT NULL,

    CONSTRAINT "InsuranceDetails_pkey" PRIMARY KEY ("serviceId")
);

-- CreateIndex
CREATE INDEX "InsuranceDetails_planTier_idx" ON "InsuranceDetails"("planTier");

-- AddForeignKey
ALTER TABLE "InsuranceDetails" ADD CONSTRAINT "InsuranceDetails_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
