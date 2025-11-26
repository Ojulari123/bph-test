import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDatabase } from './src/config/database.js'
import { errorHandler, notFound } from './src/middleware/errorHandler.js'
import { createAdminAccounts } from './src/controllers/authController.js'

// Import routes
import consultationRoutes from './src/routes/consultationRoutes.js'
import loanRoutes from './src/routes/loanRoutes.js'
import authRoutes from './src/routes/authRoutes.js'
import resourceRoutes from './src/routes/resourceRoutes.js'
import slotRoutes from './src/routes/slotRoutes.js'
import insightRoutes from './src/routes/insightRoutes.js'
import faqRoutes from './src/routes/faqRoutes.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Initialize database and seed admin accounts
async function initializeApp() {
  try {
    // Connect to database
    await connectDatabase()
    console.log('✅ Database connected successfully')
    
    // Create admin accounts
    await createAdminAccounts()
    
  } catch (error) {
    console.error('❌ Application initialization failed:', error)
    process.exit(1)
  }
}

// Initialize app
initializeApp()

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://bph-growth-frontend-website.onrender.com' 
  ],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

// Basic routes
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'BPH Growth API is running!',
    version: '1.0.0',
    endpoints: {
      consultations: '/api/consultations',
      loans: '/api/loans',
      auth: '/api/auth',
      resources: '/api/resources',
      slots: '/api/slots'
    }
  })
})

app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// API Routes
app.use('/api/consultations', consultationRoutes)
app.use('/api/loans', loanRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/resources', resourceRoutes)
app.use('/api/slots', slotRoutes)
app.use('/api/insights', insightRoutes)
app.use('/api/faqs', faqRoutes)

// Error handling
app.use(notFound)
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log('=================================')
  console.log(`✅ Server running on http://localhost:${PORT}`)
  console.log(`🔒 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`)
  console.log('=================================')
})

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error)
  process.exit(1)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled Rejection:', error)
  process.exit(1)
})