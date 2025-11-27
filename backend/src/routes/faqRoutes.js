import express from 'express'
import {
  getAllFAQs,
  getAllFAQsAdmin,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  toggleFAQStatus
} from '../controllers/faqController.js'
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js'
import { publicLimiter, adminLimiter } from '../middleware/ratelimiters.js'

const router = express.Router()

// Public route
router.get('/', publicLimiter, getAllFAQs)

// Admin routes (require authentication)
router.get('/admin', authenticateToken, authorizeAdmin, adminLimiter, getAllFAQsAdmin)
router.post('/', authenticateToken, authorizeAdmin, adminLimiter, createFAQ)
router.put('/:id', authenticateToken, authorizeAdmin, adminLimiter, updateFAQ)
router.delete('/:id', authenticateToken, authorizeAdmin, adminLimiter, deleteFAQ)
router.patch('/:id/toggle', authenticateToken, authorizeAdmin,adminLimiter, toggleFAQStatus)

export default router