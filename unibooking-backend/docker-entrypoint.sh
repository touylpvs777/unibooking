#!/bin/sh
set -e

echo "Applying Prisma migrations (migrate deploy)..."
npx prisma migrate deploy

echo "Starting UniBooking API..."

# ກວດຫາໄຟລ໌ main.js ບໍ່ວ່າມັນຈະຢູ່ໃສກໍຕາມ
if [ -f "dist/main.js" ]; then
  exec node dist/main.js
elif [ -f "dist/src/main.js" ]; then
  exec node dist/src/main.js
else
  echo "Error: Could not find main.js in dist/ or dist/src/"
  exit 1
fi