import express from 'express'
import {
  createSlot,
  createMultipleSlots,
  getAllSlots,
  getAvailableSlots,
  deleteSlot
} from '../controllers/slotController.js'
import { slotSchema, idParamSchema, multipleSlotsSchema } from '../utils/validators.js'
import { publicLimiter, adminLimiter } from '../middleware/rateLimiter.js'
import { validateRequest } from '../middleware/validation.js'
import { authenticateToken, authorizeConsultationAdmin } from '../middleware/auth.js' // FIX THIS LINE

const router = express.Router()

// Public routes
router.get('/available', publicLimiter, getAvailableSlots)

// Admin routes - require consultation admin authentication
router.post('/create', authenticateToken, authorizeConsultationAdmin, adminLimiter, validateRequest(slotSchema), createSlot)
router.post('/create-multiple', authenticateToken, authorizeConsultationAdmin, adminLimiter, validateRequest(multipleSlotsSchema), createMultipleSlots)
router.get('/all', authenticateToken, authorizeConsultationAdmin, adminLimiter, getAllSlots)
router.delete('/:id', authenticateToken, authorizeConsultationAdmin, adminLimiter, validateRequest(idParamSchema), deleteSlot)

export default router