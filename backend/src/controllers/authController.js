import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { prisma } from '../config/database.js'

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )
}

// Standardized error response
const handleError = (res, error, status = 500, message = 'An error occurred') => {
  console.error(error)
  return res.status(status).json({
    success: false,
    message,
    error: error.message || error
  })
}

// CREATE ADMIN ACCOUNTS ON STARTUP
export const createAdminAccounts = async () => {
  try {
    const hashPassword = async (plain) => await bcrypt.hash(plain, 10)

    const admins = [
      {
        model: prisma.admin,
        username: process.env.ADMIN_USERNAME || 'admin',
        password: await hashPassword(process.env.ADMIN_PASSWORD || 'admin123'),
        role: 'admin'
      },
      {
        model: prisma.consultationAdmin,
        username: process.env.CONSULTATION_ADMIN_USERNAME || 'consultation_admin',
        password: await hashPassword(process.env.CONSULTATION_ADMIN_PASSWORD || 'consultation123'),
        role: 'consultation_admin'
      },
      {
        model: prisma.loanAdmin,
        username: process.env.LOAN_ADMIN_USERNAME || 'loan_admin',
        password: await hashPassword(process.env.LOAN_ADMIN_PASSWORD || 'loan123'),
        role: 'loan_admin'
      }
    ]

    for (const { model, username, password, role } of admins) {
      await model.upsert({
        where: { username },
        update: {},
        create: { username, password, role }
      })
    }

    console.log('✅ Admin accounts created/verified successfully')
  } catch (error) {
    console.error('❌ Error creating admin accounts:', error)
  }
}

const loginHandler = (model) => async (req, res) => {
  try {
    const { username = 'admin', password } = req.body

    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required' })
    }

    const user = await model.findUnique({ where: { username } })
    if (!user) return res.status(401).json({ success: false, message: 'Invalid username or password' })

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) return res.status(401).json({ success: false, message: 'Invalid username or password' })

    const token = generateToken(user)

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username, role: user.role }
    })
  } catch (error) {
    return handleError(res, error, 500, 'Login failed')
  }
}

// Main Admin Login
export const adminLogin = loginHandler(prisma.admin)

// Consultation Admin Login
export const consultationAdminLogin = loginHandler(prisma.consultationAdmin)

// Loan Admin Login
export const loanAdminLogin = loginHandler(prisma.loanAdmin)

//Token Verification
export const verifyToken = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user
    })
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token verification failed'
    })
  }
}

// Logout (client-side handles token removal)
export const logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  })
}