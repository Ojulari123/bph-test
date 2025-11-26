import express from 'express'
import { adminLogin, consultationAdminLogin, loanAdminLogin, verifyToken, logout } from '../controllers/authController.js'
import { validateRequest } from '../middleware/validation.js'
import { publicLimiter, adminLimiter } from '../middleware/ratelimiters.js'
import { loginSchema } from '../utils/validators.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Login routes
router.post('/admin/login', publicLimiter, validateRequest(loginSchema), adminLogin) // Main admin login (password only)
router.post('/consultation/login', publicLimiter, validateRequest(loginSchema), consultationAdminLogin)
router.post('/loan/login', publicLimiter, validateRequest(loginSchema), loanAdminLogin)

// Token verification
router.get('/verify', authenticateToken, adminLimiter, verifyToken)

// Logout
router.post('/logout', authenticateToken, adminLimiter, logout)

export default router