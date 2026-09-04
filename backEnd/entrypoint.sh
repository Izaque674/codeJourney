#!/bin/sh
npx tsx node_modules/.bin/prisma migrate deploy
npx tsx node_modules/.bin/prisma db seed
node dist/server.js