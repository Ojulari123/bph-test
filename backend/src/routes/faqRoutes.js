import express from 'express'
import { publicLimiter, adminLimiter } from '../middleware/rateLimiter.js'
import { faqSchema, idParamSchema } from '../utils/validators.js'
import {
  getAllFAQs,
  getAllFAQsAdmin,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  toggleFAQStatus
} from '../controllers/faqController.js'
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js'

const router = express.Router()

// Public route
router.get('/', publicLimiter, getAllFAQs)

// Admin routes (require authentication)
router.get('/admin', authenticateToken, authorizeAdmin, adminLimiter, getAllFAQsAdmin)
router.post('/', authenticateToken, authorizeAdmin, adminLimiter, validateRequest(faqSchema), createFAQ)
router.put('/:id', authenticateToken, authorizeAdmin, adminLimiter, validateRequest(idParamSchema), validateRequest(faqSchema), updateFAQ)
router.delete('/:id', authenticateToken, authorizeAdmin, adminLimiter, validateRequest(idParamSchema), deleteFAQ)
router.patch('/:id/toggle', authenticateToken, authorizeAdmin, adminLimiter, validateRequest(idParamSchema), toggleFAQStatus)

export default router