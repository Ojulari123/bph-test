import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Hash passwords
  const consultationPassword = await bcrypt.hash(
    process.env.CONSULTATION_ADMIN_PASSWORD || 'consultation123',
    10
  )
  const loanPassword = await bcrypt.hash(
    process.env.LOAN_ADMIN_PASSWORD || 'loan123',
    10
  )

  // Create Consultation Admin
  const consultationAdmin = await prisma.consultationAdmin.upsert({
    where: { username: process.env.CONSULTATION_ADMIN_USERNAME || 'consultation_admin' },
    update: {},
    create: {
      username: process.env.CONSULTATION_ADMIN_USERNAME || 'consultation_admin',
      password: consultationPassword,
      role: 'consultation'
    }
  })
  console.log('✅ Consultation Admin created:', consultationAdmin.username)

  // Create Loan Admin
  const loanAdmin = await prisma.loanAdmin.upsert({
    where: { username: process.env.LOAN_ADMIN_USERNAME || 'loan_admin' },
    update: {},
    create: {
      username: process.env.LOAN_ADMIN_USERNAME || 'loan_admin',
      password: loanPassword,
      role: 'loan'
    }
  })
  console.log('✅ Loan Admin created:', loanAdmin.username)

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })