import { uploadImageToCloudinary } from '../config/cloudinary.js'
import multer from 'multer'

// Multer config for memory storage
const storage = multer.memoryStorage()

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false)
    }
    cb(null, true)
  }
})

// Upload image to Cloudinary (using the buffer from multer)
export const uploadToCloudinary = async (file, folder = 'insights') => {
  try {
    const result = await uploadImageToCloudinary(file.buffer, folder)
    return result
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`)
  }
}

// Delete image from Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('Cloudinary delete error:', error)
  }
}