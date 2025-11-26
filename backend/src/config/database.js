import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['warn', 'error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

// Test database connection
async function connectDatabase() {
  try {
    await prisma.$connect()
    console.log('✅ Database connected successfully')
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
    // Don't exit - let the app continue
  }
}

// Graceful shutdown
async function disconnectDatabase() {
  await prisma.$disconnect()
  console.log('📊 Database disconnected')
}

process.on('beforeExit', disconnectDatabase)
process.on('SIGINT', disconnectDatabase)
process.on('SIGTERM', disconnectDatabase)

export { prisma, connectDatabase, disconnectDatabase }