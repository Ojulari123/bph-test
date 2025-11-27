import express from 'express'
import { submitLoan, getAllLoans, approveLoan, denyLoan } from '../controllers/loanController.js'
import { validateRequest } from '../middleware/validation.js'
import { loanSchema } from '../utils/validators.js'
import { authenticateToken, authorizeLoanAdmin } from '../middleware/auth.js'
import { publicLimiter, adminLimiter } from '../middleware/ratelimiters.js'

const router = express.Router()

// Public route - submit loan (with Zod validation)
router.post('/submit', publicLimiter, validateRequest(loanSchema), submitLoan)

// Admin routes - require authentication
router.get('/', authenticateToken, authorizeLoanAdmin, adminLimiter, getAllLoans)
router.patch('/:id/approve', authenticateToken, authorizeLoanAdmin, adminLimiter, approveLoan)
router.patch('/:id/deny', authenticateToken, authorizeLoanAdmin, adminLimiter, denyLoan)

export default router