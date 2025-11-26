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
import { insightSchema, idParamSchema } from '../utils/validators.js'
import { publicLimiter, adminLimiter } from '../middleware/rateLimiter.js'

const router = express.Router()

// Public routes
router.get('/', publicLimiter, getAllInsights)

// Admin routes (MUST come BEFORE /:id route!)
router.get('/admin', authenticateToken, authorizeAdmin, adminLimiter, getAllInsightsAdmin)
router.post('/', authenticateToken, authorizeAdmin, adminLimiter, validateRequest(insightSchema), createInsight)
router.post('/upload-image', authenticateToken, authorizeAdmin, uploadLimiter, upload.single('image'), uploadImage)
router.put('/:id', authenticateToken, authorizeAdmin, adminLimiter, validateRequest(idParamSchema), validateRequest(insightSchema), updateInsight)
router.delete('/:id', authenticateToken, authorizeAdmin, adminLimiter, validateRequest(idParamSchema), deleteInsight)
router.patch('/:id/toggle', authenticateToken, authorizeAdmin, adminLimiter, validateRequest(idParamSchema), toggleInsightStatus)

// Dynamic ID route (MUST come LAST!)
router.get('/:id', publicLimiter, validateRequest(idParamSchema), getInsightById)

export default router