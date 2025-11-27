import express from 'express'
import {
  createInsight,
  getAllInsights,
  getAllInsightsAdmin,
  getInsightById,
  updateInsight,
  deleteInsight,
  toggleInsightStatus,
  uploadImage
} from '../controllers/insightController.js'
import { upload } from '../utils/uploadHelper.js'
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js'
import { publicLimiter, adminLimiter, uploadLimiter } from '../middleware/ratelimiters.js'

const router = express.Router()

// Public routes
router.get('/', publicLimiter, getAllInsights)

// Admin routes (MUST come BEFORE /:id route!)
router.get('/admin', authenticateToken, authorizeAdmin, adminLimiter, getAllInsightsAdmin)
router.post('/', authenticateToken, authorizeAdmin, adminLimiter, createInsight)
router.post('/upload-image', authenticateToken, authorizeAdmin, uploadLimiter, upload.single('image'), uploadImage)
router.put('/:id', authenticateToken, authorizeAdmin, adminLimiter, updateInsight)
router.delete('/:id', authenticateToken, authorizeAdmin, adminLimiter, deleteInsight)
router.patch('/:id/toggle', authenticateToken, authorizeAdmin, adminLimiter, toggleInsightStatus)

// Dynamic ID route (MUST come LAST!)
router.get('/:id', publicLimiter, getInsightById)

export default router