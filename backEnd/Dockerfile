FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma.config.ts ./
COPY prisma ./prisma

RUN npm install

RUN npx tsx prisma.config.ts && npx tsc prisma.config.ts --outDir . --module commonjs --target es2020 || true

COPY . .

RUN npx tsx node_modules/.bin/prisma generate

RUN npm run build

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

CMD ["sh", "entrypoint.sh"]