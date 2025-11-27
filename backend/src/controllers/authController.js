import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { prisma } from '../config/database.js'

// CREATE ADMIN ACCOUNTS ON STARTUP
export const createAdminAccounts = async () => {
  try {
    // Hash passwords
    const adminPasswordHash = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || 'admin123',
      10
    )
    const consultationPasswordHash = await bcrypt.hash(
      process.env.CONSULTATION_ADMIN_PASSWORD || 'consultation123',
      10
    )
    const loanPasswordHash = await bcrypt.hash(
      process.env.LOAN_ADMIN_PASSWORD || 'loan123',
      10
    )

    // Create or update main admin
    await prisma.admin.upsert({
      where: { username: process.env.ADMIN_USERNAME || 'admin' },
      update: {},
      create: {
        username: process.env.ADMIN_USERNAME || 'admin',
        password: adminPasswordHash,
        role: 'admin'
      }
    })

    // Create or update consultation admin
    await prisma.consultationAdmin.upsert({
      where: { username: process.env.CONSULTATION_ADMIN_USERNAME || 'consultation_admin' },
      update: {},
      create: {
        username: process.env.CONSULTATION_ADMIN_USERNAME || 'consultation_admin',
        password: consultationPasswordHash,
        role: 'consultation_admin'
      }
    })

    // Create or update loan admin
    await prisma.loanAdmin.upsert({
      where: { username: process.env.LOAN_ADMIN_USERNAME || 'loan_admin' },
      update: {},
      create: {
        username: process.env.LOAN_ADMIN_USERNAME || 'loan_admin',
        password: loanPasswordHash,
        role: 'loan_admin'
      }
    })

    console.log('✅ Admin accounts created/verified successfully')
  } catch (error) {
    console.error('❌ Error creating admin accounts:', error)
  }
}

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )
}

// Main Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { password } = req.body

    // Find admin (using default username 'admin')
    const admin = await prisma.admin.findUnique({
      where: { username: 'admin' }
    })

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password)

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      })
    }

    // Generate token
    const token = generateToken(admin)

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: admin.id,
        username: admin.username,
        role: admin.role
      }
    })
  } catch (error) {
    console.error('Admin login error:', error)
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    })
  }
}

// Consultation Admin Login
export const consultationAdminLogin = async (req, res) => {
  try {
    const { username, password } = req.body

    // Find admin
    const admin = await prisma.consultationAdmin.findUnique({
      where: { username }
    })

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password)

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      })
    }

    // Generate token
    const token = generateToken(admin)

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: admin.id,
        username: admin.username,
        role: admin.role
      }
    })
  } catch (error) {
    console.error('Consultation admin login error:', error)
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    })
  }
}

// Loan Admin Login
export const loanAdminLogin = async (req, res) => {
  try {
    const { username, password } = req.body

    // Find admin
    const admin = await prisma.loanAdmin.findUnique({
      where: { username }
    })

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password)

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      })
    }

    // Generate token
    const token = generateToken(admin)

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: admin.id,
        username: admin.username,
        role: admin.role
      }
    })
  } catch (error) {
    console.error('Loan admin login error:', error)
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    })
  }
}

// Verify token
export const verifyToken = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user
    })
  } catch (error) {
    res.status(401).json({
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