require('dotenv/config')
const path = require('path')
const { defineConfig } = require('prisma/config')

export default defineConfig({
  earlyAccess: true,
  schema: path.join('prisma', 'schema.prisma'),
  datasource: {
    url: process.env.DATABASE_URL!,
  }
})