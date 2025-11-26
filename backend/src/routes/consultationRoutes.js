import express from 'express'
import { submitConsultation, getAllConsultations, approveConsultation, denyConsultation } from '../controllers/consultationController.js'
import { validateRequest } from '../middleware/validation.js'
import { consultationSchema, idParamSchema } from '../utils/validators.js'
import { publicLimiter, adminLimiter } from '../middleware/rateLimiter.js'
import { authenticateToken, authorizeConsultationAdmin } from '../middleware/auth.js'

const router = express.Router()

// Public route - submit consultation (with Zod validation)
router.post('/submit', publicLimiter, validateRequest(consultationSchema), submitConsultation)

// Admin routes - require authentication
router.get('/', authenticateToken, authorizeConsultationAdmin, adminLimiter, getAllConsultations)
router.patch('/:id/approve', authenticateToken, authorizeConsultationAdmin, adminLimiter, validateRequest(idParamSchema), approveConsultation)
router.patch('/:id/deny', authenticateToken, authorizeConsultationAdmin, adminLimiter, validateRequest(idParamSchema), denyConsultation)

export default router