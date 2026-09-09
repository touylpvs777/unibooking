import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import {
  CarRentalDetails,
  HotelDetails,
  PrismaClient,
  Role,
  Service,
  ServiceType,
  TourDetails,
} from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// Same cost factor as the real registration path -- see
// src/users/users.service.ts's BCRYPT_SALT_ROUNDS -- so a fixture account's
// hash isn't distinguishable from (or weaker than) a real one.
const BCRYPT_SALT_ROUNDS = 12;
const FIXTURE_PASSWORD = 'password123';

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const FIXTURE_DATE_RANGE_DAYS = 14; // covers "this week and next week"

// -----------------------------------------------------------------------------
// Homepage "Our Latest Videos" grid -- see VideoCard.vue / stores/videos.js.
// Safe to re-run: matches on youtubeId and updates in place.
// -----------------------------------------------------------------------------
const VIDEOS: { title: string; youtubeId: string; duration: string }[] = [
  { title: 'ຕາດກວາງຊີ ຫຼວງພະບາງ', youtubeId: 'YH-kzdM4ANo', duration: '0:30' },
  { title: 'ລ່ອງເຮືອແມ່ນ້ຳຂອງ', youtubeId: 'gTGt6U_xfMo', duration: '0:15' },
  { title: 'ທ່ຽວປາກເຊ', youtubeId: 'iCdHPjVww5M', duration: '0:20' },
  { title: 'ນະຄອນຫຼວງວຽງຈັນ', youtubeId: '0KIkqkm-jBs', duration: '0:15' },
  { title: 'ວັງວຽງ ມົນສະເໜ່ທຳມະຊາດ', youtubeId: 'U9jiyr0OGjI', duration: '0:25' },
  { title: 'ວັດຊຽງທອງ', youtubeId: 'ZZZdBUGlcfE', duration: '0:20' },
  { title: 'ກິດຈະກຳຜະຈົນໄພ ວັງວຽງ', youtubeId: '9vw4bnH2z4Y', duration: '0:28' },
  { title: 'ທຳມະຊາດຕາດກວາງຊີ', youtubeId: 'YCpIpIsouzE', duration: '0:22' },
];

function parseDurationSeconds(label: string): number {
  const [minutes, seconds] = label.split(':').map(Number);
  return minutes * 60 + seconds;
}

async function seedVideos(prisma: PrismaClient): Promise<void> {
  for (const video of VIDEOS) {
    const data = {
      title: video.title,
      youtubeId: video.youtubeId,
      thumbnailUrl: `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`,
      durationLabel: video.duration,
      startSeconds: 0,
      endSeconds: parseDurationSeconds(video.duration),
    };

    const existing = await prisma.video.findFirst({
      where: { youtubeId: video.youtubeId },
    });

    if (existing) {
      await prisma.video.update({ where: { id: existing.id }, data });
    } else {
      await prisma.video.create({ data });
    }
  }

  console.log(`Seeded ${VIDEOS.length} videos.`);
}

// -----------------------------------------------------------------------------
// Test accounts -- ADMIN / SUPPLIER / CUSTOMER, all password "password123".
// Upserted by email so re-running the seed always restores known-good
// credentials (e.g. after manually changing a password while testing),
// rather than skipping silently once the row exists.
// -----------------------------------------------------------------------------
interface FixtureAccount {
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
}

const FIXTURE_ACCOUNTS: FixtureAccount[] = [
  { email: 'admin@unibooking.test', firstName: 'Admin', lastName: 'Account', role: Role.ADMIN },
  { email: 'supplier@unibooking.test', firstName: 'Supplier', lastName: 'Account', role: Role.SUPPLIER },
  { email: 'customer@unibooking.test', firstName: 'Customer', lastName: 'Account', role: Role.CUSTOMER },
];

async function seedAccounts(
  prisma: PrismaClient,
): Promise<Record<Role, string>> {
  const passwordHash = await bcrypt.hash(FIXTURE_PASSWORD, BCRYPT_SALT_ROUNDS);
  const userIdByRole = {} as Record<Role, string>;

  for (const account of FIXTURE_ACCOUNTS) {
    const user = await prisma.user.upsert({
      where: { email: account.email },
      create: {
        email: account.email,
        password_hash: passwordHash,
        firstName: account.firstName,
        lastName: account.lastName,
        role: account.role,
      },
      update: {
        password_hash: passwordHash,
        firstName: account.firstName,
        lastName: account.lastName,
        role: account.role,
        isActive: true,
      },
    });
    userIdByRole[account.role] = user.id;
  }

  console.log(`Seeded ${FIXTURE_ACCOUNTS.length} accounts (password: "${FIXTURE_PASSWORD}").`);
  return userIdByRole;
}

async function seedSupplierProfile(
  prisma: PrismaClient,
  supplierUserId: string,
): Promise<string> {
  const supplier = await prisma.supplier.upsert({
    where: { userId: supplierUserId },
    create: {
      userId: supplierUserId,
      companyName: 'Mekong Journeys Co., Ltd.',
      contactEmail: 'supplier@unibooking.test',
      contactPhone: '+856 20 1234 5678',
      isVerified: true,
    },
    update: {
      companyName: 'Mekong Journeys Co., Ltd.',
      isVerified: true,
    },
  });

  return supplier.id;
}

/** Today .. today+FIXTURE_DATE_RANGE_DAYS-1, midnight-UTC per day -- matches how InventoryPricing.date is stored/queried elsewhere (see BookingsService.nightsBetween). */
function fixtureDateRange(): Date[] {
  const today = new Date();
  const startOfToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  return Array.from(
    { length: FIXTURE_DATE_RANGE_DAYS },
    (_, i) => new Date(startOfToday.getTime() + i * MS_PER_DAY),
  );
}

/**
 * Upserts (not delete + recreate) InventoryPricing per date -- a delete
 * would violate BookingItem_inventoryPricingId_fkey the moment a test
 * booking has actually been made against one of these rows (the exact
 * thing running the seed and then testing the booking flow produces), since
 * BookingItem.inventoryPricingId is a hard, non-cascading FK. Upserting
 * still fully resets availableUnits/price back to the fixture's values on
 * every re-run -- it just does it in place instead of delete+recreate.
 */
async function seedInventoryForRange(
  prisma: PrismaClient,
  serviceId: string,
  price: number,
  availableUnits: number,
): Promise<void> {
  for (const date of fixtureDateRange()) {
    await prisma.inventoryPricing.upsert({
      where: { serviceId_date: { serviceId, date } },
      create: { serviceId, date, price, availableUnits },
      update: { price, availableUnits },
    });
  }
}

async function findFixtureService(
  prisma: PrismaClient,
  supplierId: string,
  name: string,
): Promise<Service | null> {
  return prisma.service.findFirst({ where: { supplierId, name } });
}

async function seedHotel(
  prisma: PrismaClient,
  supplierId: string,
): Promise<Service & { hotelDetails: HotelDetails }> {
  const name = 'Vientiane Riverside Hotel';
  const existing = await findFixtureService(prisma, supplierId, name);

  const service =
    existing ??
    (await prisma.service.create({
      data: {
        supplierId,
        type: ServiceType.HOTEL,
        name,
        description:
          'A riverside hotel in the heart of Vientiane Capital, minutes from Wat Chanthabuly and the Mekong riverfront night market.',
        location: 'Vientiane Capital, Laos',
      },
    }));

  const hotelDetails = await prisma.hotelDetails.upsert({
    where: { serviceId: service.id },
    create: {
      serviceId: service.id,
      starRating: 4,
      propertyType: 'HOTEL',
      amenities: ['WiFi', 'Pool', 'Breakfast', 'Parking'],
    },
    update: {
      starRating: 4,
      propertyType: 'HOTEL',
      amenities: ['WiFi', 'Pool', 'Breakfast', 'Parking'],
    },
  });

  // 350,000 LAK/night, 5 rooms/night -- comfortably bookable for manual testing.
  await seedInventoryForRange(prisma, service.id, 350_000, 5);

  return { ...service, hotelDetails };
}

async function seedCarRental(
  prisma: PrismaClient,
  supplierId: string,
): Promise<Service & { carRentalDetails: CarRentalDetails }> {
  const name = 'Toyota Fortuner SUV Rental';
  const existing = await findFixtureService(prisma, supplierId, name);

  const service =
    existing ??
    (await prisma.service.create({
      data: {
        supplierId,
        type: ServiceType.CAR_RENTAL,
        name,
        description: 'Automatic 7-seat SUV, self-drive, unlimited mileage within Vientiane Capital.',
        location: 'Vientiane Capital, Laos',
      },
    }));

  const carRentalDetails = await prisma.carRentalDetails.upsert({
    where: { serviceId: service.id },
    create: {
      serviceId: service.id,
      vehicleType: 'SUV',
      transmission: 'AUTOMATIC',
      seatingCapacity: 7,
    },
    update: {
      vehicleType: 'SUV',
      transmission: 'AUTOMATIC',
      seatingCapacity: 7,
    },
  });

  // 250,000 LAK/day, 3 vehicles/day.
  await seedInventoryForRange(prisma, service.id, 250_000, 3);

  return { ...service, carRentalDetails };
}

async function seedTour(
  prisma: PrismaClient,
  supplierId: string,
): Promise<Service & { tourDetails: TourDetails }> {
  const name = 'Vang Vieng Adventure Day Tour';
  const existing = await findFixtureService(prisma, supplierId, name);

  const service =
    existing ??
    (await prisma.service.create({
      data: {
        supplierId,
        type: ServiceType.TOUR,
        name,
        description: 'Full-day tubing, kayaking, and Blue Lagoon tour from Vang Vieng, lunch included.',
        location: 'Vang Vieng, Laos',
      },
    }));

  const tourDetails = await prisma.tourDetails.upsert({
    where: { serviceId: service.id },
    create: {
      serviceId: service.id,
      durationDays: 1,
      category: 'Adventure',
      difficulty: 'MODERATE',
      minGroupSize: 1,
      maxGroupSize: 12,
    },
    update: {
      durationDays: 1,
      category: 'Adventure',
      difficulty: 'MODERATE',
      minGroupSize: 1,
      maxGroupSize: 12,
    },
  });

  // 180,000 LAK/person/departure, 10 spots per day.
  await seedInventoryForRange(prisma, service.id, 180_000, 10);

  return { ...service, tourDetails };
}

async function main(): Promise<void> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set -- check your .env file.');
  }

  const prisma = new PrismaClient({ adapter: new PrismaPg(connectionString) });

  try {
    await seedVideos(prisma);

    const userIdByRole = await seedAccounts(prisma);
    const supplierId = await seedSupplierProfile(prisma, userIdByRole[Role.SUPPLIER]);

    await seedHotel(prisma, supplierId);
    await seedCarRental(prisma, supplierId);
    await seedTour(prisma, supplierId);

    console.log(
      `Seeded 1 hotel, 1 car rental, and 1 tour under supplier ${supplierId}, ` +
        `each with ${FIXTURE_DATE_RANGE_DAYS} days of availability starting today.`,
    );
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
