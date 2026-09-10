-- AlterEnum
ALTER TYPE "ServiceType" ADD VALUE 'APARTMENT';

-- CreateTable
CREATE TABLE "ApartmentDetails" (
    "serviceId" TEXT NOT NULL,
    "bedrooms" SMALLINT NOT NULL,
    "bathrooms" SMALLINT NOT NULL,
    "hasKitchen" BOOLEAN NOT NULL DEFAULT true,
    "maxGuests" INTEGER NOT NULL,
    "amenities" TEXT[],

    CONSTRAINT "ApartmentDetails_pkey" PRIMARY KEY ("serviceId")
);

-- CreateIndex
CREATE INDEX "ApartmentDetails_bedrooms_idx" ON "ApartmentDetails"("bedrooms");

-- AddForeignKey
ALTER TABLE "ApartmentDetails" ADD CONSTRAINT "ApartmentDetails_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
