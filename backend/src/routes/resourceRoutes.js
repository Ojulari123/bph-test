import express from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { v2 as cloudinary } from 'cloudinary'
import { PrismaClient } from '@prisma/client'
import {
  getAllResources,
  getAllResourcesAdmin,
  createResource,
  updateResource,
  deleteResource,
  toggleResourceStatus,
  trackDownload,
  uploadResourceImage
} from '../controllers/resourceController.js'
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js'
import { v2 as cloudinary } from '../config/cloudinary.js'
// import { publicDecrypt } from 'crypto'
import { publicLimiter, adminLimiter, uploadLimiter } from '../middleware/ratelimiters.js'
import { idParamSchema, resourceSchema } from '../utils/validators.js'
import { validateRequest } from '../middleware/validation.js'
import { prisma } from '../lib/prisma.js' 

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const router = express.Router()

const ALLOWED_EXTENSIONS = new Set(['.pdf', '.xlsx', '.xls', '.pptx', '.ppt', '.docx', '.doc', '.zip', '.jpeg', '.jpg', '.png', '.webp']);

const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, 'uploads/')},
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9-_]/g, "");
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${safeBase}-${unique}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return cb(new Error("File extension not allowed"), false);
    }
    cb(null, true);
  }
});

const optionalAuthenticate = (req, res, next) => {
  const authHeader = req.headers['authorization']
  if (authHeader) return authenticateToken(req, res, next)
  next()
}

// File download route - serves files directly
router.get("/file/:publicId", optionalAuthenticate, async (req, res) => {
  try {
    const fileEntry = await prisma.resource.findUnique({
      where: { filePublicId: req.params.publicId }
    })
    if (!fileEntry || !fileEntry.filePublicId) {
      return res.status(404).json({ 
        success: false, 
        message: "File not found on Cloudinary" 
      })
    }
    const downloadUrl = cloudinary.url(fileEntry.filePublicId, {
      resource_type: 'auto',
      sign_url: true
    })
    return res.redirect(downloadUrl)
  } catch (err) {
    console.error("Download error:", err)
    return res.status(500).json({ 
      success: false, 
      message: "Server error" 
    })
  }
});

// Public routes
router.get('/', publicLimiter, getAllResources)
router.post('/download', publicLimiter, optionalAuthenticate, trackDownload)

// Admin routes
router.get('/admin', authenticateToken, authorizeAdmin, adminLimiter, getAllResourcesAdmin)
router.post('/upload-image', authenticateToken, authorizeAdmin, uploadLimiter, upload.single('image'), uploadResourceImage)
router.post( '/', authenticateToken, authorizeAdmin, uploadLimiter, adminLimiter, validateRequest(resourceSchema), upload.single('file'), createResource)
router.put('/:id', authenticateToken, authorizeAdmin, adminLimiter, validateRequest(idParamSchema), validateRequest(resourceSchema), upload.single('file'), updateResource)
router.delete('/:id', authenticateToken, authorizeAdmin, adminLimiter, validateRequest(idParamSchema), deleteResource)
router.patch('/:id/toggle', authenticateToken, authorizeAdmin, adminLimiter, validateRequest(idParamSchema), toggleResourceStatus)

export default router