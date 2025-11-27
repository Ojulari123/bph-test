import express from 'express'
import {
  createSlot,
  createMultipleSlots,
  getAllSlots,
  getAvailableSlots,
  deleteSlot
} from '../controllers/slotController.js'
import { authenticateToken, authorizeConsultationAdmin } from '../middleware/auth.js' // FIX THIS LINE
import { publicLimiter, adminLimiter } from '../middleware/ratelimiters.js'

const router = express.Router()

// Public routes
router.get('/available', publicLimiter, getAvailableSlots)

// Admin routes - require consultation admin authentication
router.post('/create', authenticateToken, authorizeConsultationAdmin, adminLimiter, createSlot)
router.post('/create-multiple', authenticateToken, authorizeConsultationAdmin, adminLimiter, createMultipleSlots)
router.get('/all', authenticateToken, authorizeConsultationAdmin, adminLimiter, getAllSlots)
router.delete('/:id', authenticateToken, authorizeConsultationAdmin, adminLimiter, deleteSlot)

export default router