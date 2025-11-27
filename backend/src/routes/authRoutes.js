import express from 'express'
import { adminLogin, consultationAdminLogin, loanAdminLogin, verifyToken, logout } from '../controllers/authController.js'
import { validateRequest } from '../middleware/validation.js'
import { loginSchema } from '../utils/validators.js'
import { authenticateToken } from '../middleware/auth.js'
import { publicLimiter, adminLimiter } from '../middleware/ratelimiters.js'

const router = express.Router()

// Login routes
router.post('/admin/login', publicLimiter, adminLogin) // Main admin login (password only)
router.post('/consultation/login', publicLimiter, validateRequest(loginSchema), consultationAdminLogin)
router.post('/loan/login', publicLimiter, validateRequest(loginSchema), loanAdminLogin)

// Token verification
router.get('/verify', authenticateToken, adminLimiter, verifyToken)

// Logout
router.post('/logout', adminLimiter, logout)

export default router