// import { prisma } from '../config/database.js'
// import { uploadToCloudinary, uploadImageToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js'
// import { sendEmail } from '../config/email.js'
// import { resourceDownloadTemplate } from '../utils/emailTemplates.js'
// import path from 'path'
// import fs from 'fs/promises'
// import { fileURLToPath } from 'url'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// // Upload placeholder image (still use Cloudinary for images)
// export const uploadResourceImage = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: 'Image file is required'
//       })
//     }

//     // Read file buffer
//     const fileBuffer = await fs.readFile(req.file.path)

//     // Upload to Cloudinary as image
//     const uploadResult = await uploadImageToCloudinary(fileBuffer, 'resources/images')

//     // Delete temp file
//     try {
//       await fs.unlink(req.file.path)
//     } catch (err) {
//       console.error('Error deleting temp file:', err)
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Image uploaded successfully',
//       data: {
//         imageUrl: uploadResult.secure_url
//       }
//     })
//   } catch (error) {
//     console.error('Error uploading image:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to upload image',
//       error: error.message
//     })
//   }
// }

// // Create resource - Store files locally
// export const createResource = async (req, res) => {
//   try {
//     const { category, title, description, imageUrl } = req.body

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: 'File is required'
//       })
//     }

//     // Generate unique filename
//     const fileExtension = path.extname(req.file.originalname)
//     const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(7)}${fileExtension}`

//     // Move file to public/resources directory
//     const resourcesDir = path.join(__dirname, '../../public/resources')
//     const filePath = path.join(resourcesDir, uniqueFilename)

//     await fs.mkdir(resourcesDir, { recursive: true })
//     await fs.rename(req.file.path, filePath)

//     // Determine file type
//     const formatMap = {
//       '.pdf': 'PDF',
//       '.xlsx': 'XLSX',
//       '.xls': 'XLS',
//       '.pptx': 'PPTX',
//       '.ppt': 'PPT',
//       '.docx': 'DOCX',
//       '.doc': 'DOC',
//       '.zip': 'ZIP'
//     }

//     const fileType = formatMap[fileExtension.toLowerCase()] || 'FILE'
//     const fileSize = `${(req.file.size / 1024 / 1024).toFixed(1)} MB`

//     // Create resource in database with local file path
//     const resource = await prisma.resource.create({
//       data: {
//         category,
//         title,
//         description,
//         imageUrl: imageUrl || null,
//         fileUrl: `/resources/${uniqueFilename}`,  // Local path
//         filePublicId: uniqueFilename,  // Use filename as ID
//         fileSize: fileSize,
//         fileType: fileType,
//         isActive: true
//       }
//     })

//     console.log('✅ Resource created:', resource.id, 'Type:', fileType)

//     res.status(201).json({
//       success: true,
//       message: 'Resource created successfully',
//       data: resource
//     })
//   } catch (error) {
//     console.error('Error creating resource:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to create resource',
//       error: error.message
//     })
//   }
// }

// // Update resource
// export const updateResource = async (req, res) => {
//   try {
//     const { id } = req.params
//     const { category, title, description, isActive, imageUrl } = req.body

//     const existingResource = await prisma.resource.findUnique({
//       where: { id }
//     })

//     if (!existingResource) {
//       return res.status(404).json({
//         success: false,
//         message: 'Resource not found'
//       })
//     }

//     let fileUrl = existingResource.fileUrl
//     let filePublicId = existingResource.filePublicId
//     let fileSize = existingResource.fileSize
//     let fileType = existingResource.fileType

//     // If new file is uploaded
//     if (req.file) {
//       // Delete old file
//       if (existingResource.filePublicId) {
//         const oldFilePath = path.join(__dirname, '../../public/resources', existingResource.filePublicId)
//         try {
//           await fs.unlink(oldFilePath)
//         } catch (err) {
//           console.error('Error deleting old file:', err)
//         }
//       }

//       // Save new file
//       const fileExtension = path.extname(req.file.originalname)
//       const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(7)}${fileExtension}`
//       const resourcesDir = path.join(__dirname, '../../public/resources')
//       const filePath = path.join(resourcesDir, uniqueFilename)

//       await fs.rename(req.file.path, filePath)

//       const formatMap = {
//         '.pdf': 'PDF',
//         '.xlsx': 'XLSX',
//         '.xls': 'XLS',
//         '.pptx': 'PPTX',
//         '.ppt': 'PPT',
//         '.docx': 'DOCX',
//         '.doc': 'DOC',
//         '.zip': 'ZIP'
//       }

//       fileUrl = `/resources/${uniqueFilename}`
//       filePublicId = uniqueFilename
//       fileType = formatMap[fileExtension.toLowerCase()] || 'FILE'
//       fileSize = `${(req.file.size / 1024 / 1024).toFixed(1)} MB`
//     }

//     const resource = await prisma.resource.update({
//       where: { id },
//       data: {
//         category,
//         title,
//         description,
//         imageUrl: imageUrl !== undefined ? imageUrl : existingResource.imageUrl,
//         fileUrl,
//         filePublicId,
//         fileSize,
//         fileType,
//         isActive
//       }
//     })

//     res.status(200).json({
//       success: true,
//       message: 'Resource updated successfully',
//       data: resource
//     })
//   } catch (error) {
//     console.error('Error updating resource:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update resource',
//       error: error.message
//     })
//   }
// }

// // Delete resource
// export const deleteResource = async (req, res) => {
//   try {
//     const { id } = req.params

//     const resource = await prisma.resource.findUnique({
//       where: { id }
//     })

//     if (!resource) {
//       return res.status(404).json({
//         success: false,
//         message: 'Resource not found'
//       })
//     }

//     // Delete file from local storage
//     if (resource.filePublicId) {
//       const filePath = path.join(__dirname, '../../public/resources', resource.filePublicId)
//       try {
//         await fs.unlink(filePath)
//         console.log('🗑️ File deleted:', filePath)
//       } catch (err) {
//         console.error('Error deleting file:', err)
//       }
//     }

//     // Delete from database
//     await prisma.resource.delete({
//       where: { id }
//     })

//     res.status(200).json({
//       success: true,
//       message: 'Resource deleted successfully'
//     })
//   } catch (error) {
//     console.error('Error deleting resource:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete resource',
//       error: error.message
//     })
//   }
// }

// // Track download
// export const trackDownload = async (req, res) => {
//   try {
//     const { email, resourceId } = req.body

//     const resource = await prisma.resource.findUnique({
//       where: { id: resourceId }
//     })

//     if (!resource) {
//       return res.status(404).json({
//         success: false,
//         message: 'Resource not found'
//       })
//     }

//     // Track download
//     await prisma.resourceDownload.create({
//       data: {
//         email,
//         resourceId,
//         resourceTitle: resource.title
//       }
//     })

//     console.log(`📥 Download tracked: ${resource.title} by ${email}`)

//     // Generate download URL
//     const downloadUrl = `${process.env.API_URL || 'http://localhost:5000'}/api/resources/file/${resource.filePublicId}`

//     // Send email
//     try {
//       await sendEmail({
//         to: email,
//         subject: `Your Resource: ${resource.title} - BPH Growth`,
//         html: resourceDownloadTemplate({
//           email,
//           resourceTitle: resource.title,
//           downloadUrl: downloadUrl
//         })
//       })

//       console.log('✅ Download email sent to:', email)
//     } catch (emailError) {
//       console.error('⚠️ Email sending failed:', emailError.message)
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Resource ready for download',
//       data: {
//         downloadUrl: downloadUrl,
//         fileName: resource.title,
//         fileType: resource.fileType
//       }
//     })
//   } catch (error) {
//     console.error('Error tracking download:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to process download',
//       error: error.message
//     })
//   }
// }

// // Get all resources functions remain the same...
// export const getAllResources = async (req, res) => {
//   try {
//     const resources = await prisma.resource.findMany({
//       where: { isActive: true },
//       orderBy: { createdAt: 'desc' }
//     })

//     res.status(200).json({
//       success: true,
//       data: resources
//     })
//   } catch (error) {
//     console.error('Error fetching resources:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch resources',
//       error: error.message
//     })
//   }
// }

// export const getAllResourcesAdmin = async (req, res) => {
//   try {
//     const resources = await prisma.resource.findMany({
//       orderBy: { createdAt: 'desc' }
//     })

//     const resourcesWithStats = await Promise.all(
//       resources.map(async (resource) => {
//         const downloadCount = await prisma.resourceDownload.count({
//           where: { resourceId: resource.id }
//         })
//         return { ...resource, downloadCount }
//       })
//     )

//     res.status(200).json({
//       success: true,
//       data: resourcesWithStats
//     })
//   } catch (error) {
//     console.error('Error fetching resources:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch resources',
//       error: error.message
//     })
//   }
// }

// export const toggleResourceStatus = async (req, res) => {
//   try {
//     const { id } = req.params

//     const resource = await prisma.resource.findUnique({
//       where: { id }
//     })

//     if (!resource) {
//       return res.status(404).json({
//         success: false,
//         message: 'Resource not found'
//       })
//     }

//     const updatedResource = await prisma.resource.update({
//       where: { id },
//       data: { isActive: !resource.isActive }
//     })

//     res.status(200).json({
//       success: true,
//       message: `Resource ${updatedResource.isActive ? 'activated' : 'deactivated'}`,
//       data: updatedResource
//     })
//   } catch (error) {
//     console.error('Error toggling resource status:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to toggle resource status',
//       error: error.message
//     })
//   }
// }


import { prisma } from '../config/database.js'
import { v2 as cloudinary } from 'cloudinary'
import { uploadToCloudinary, uploadImageToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js'
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js'
import { validationResult, body } from 'express-validator'
import { sendCustomerEmail } from '../config/email.js'
import { resourceDownloadTemplate } from '../utils/emailTemplates.js'
import path from 'path'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const validateResourceInput = [
    body('category').notEmpty().withMessage('Category is required'),
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required')
  ]
  
//Upload resoruce image to cloudinary
export const uploadResourceImage = [ authenticateToken, authorizeAdmin, async (req, res, next) => {
        try {
            if (!req.file) {
                return res.status(400).json({ success: false, message: 'Image file is required' })
            }

            const uploadResult = await uploadToCloudinary(req.file, 'resources')

            let updatedResource = null
            if (req.body.resourceId) {
                updatedResource = await prisma.resource.update({
                    where: { id: req.body.resourceId },
                    data: { imageUrl: uploadResult.secure_url }
                })
            }

            res.status(200).json({
                success: true,
                message: 'Image uploaded successfully',
                data: updatedResource || { imageUrl: uploadResult.secure_url }
            })
        } catch (err) {
            console.error('Error uploading image:', err)
            next(err)
        }
    }
]

// Create resource - Store files locally
export const createResource = [ authenticateToken, authorizeAdmin, validateResourceInput, async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
      
        const { category, title, description, imageUrl } = req.body

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'File is required'
            })
        }

        // Generate unique filename
        const fileExtension = path.extname(req.file.originalname)
        const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(2)}${fileExtension}`

        // Move file to public/resources directory
        const resourcesDir = path.join(__dirname, '../../public/resources')
        await fs.mkdir(resourcesDir, { recursive: true })

        const filePath = path.join(resourcesDir, uniqueFilename)
        await fs.rename(req.file.path, filePath)

        // Determine file type
        const formatMap = {
            '.pdf': 'PDF',
            '.xlsx': 'XLSX',
            '.xls': 'XLS',
            '.pptx': 'PPTX',
            '.ppt': 'PPT',
            '.docx': 'DOCX',
            '.doc': 'DOC',
            '.zip': 'ZIP'
        }

        const fileType = formatMap[fileExtension.toLowerCase()] || 'FILE'
        const fileSize = `${(req.file.size / 1024 / 1024).toFixed(2)} MB`

        // Create resource in database with local file path
        const resource = await prisma.resource.create({
            data: {
                category,
                title,
                description,
                imageUrl: imageUrl || null,
                fileUrl: `/resources/${uniqueFilename}`, 
                filePublicId: uniqueFilename,
                fileSize: fileSize,
                fileType: fileType,
                isActive: true
            }
        })

        console.log('✅ Resource created:', resource.id, 'Type:', fileType)

        res.status(201).json({
            success: true,
            message: 'Resource created successfully',
            data: resource
        })
    } catch (err) {
        console.error('Error creating resource:', err)
        next(err)
    }
}
]

// Update resource
export const updateResource = [ authenticateToken, authorizeAdmin, async (req, res, next) => {
    try {
        const { id } = req.params
        const { category, title, description, isActive, imageUrl } = req.body

        const existingResource = await prisma.resource.findUnique({ where: { id } })

        if (!existingResource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found'
            })
        }

        let fileUrl = existingResource.fileUrl
        let filePublicId = existingResource.filePublicId
        let fileSize = existingResource.fileSize
        let fileType = existingResource.fileType

        // If new file is uploaded
        if (req.file) {
            // Delete old file
            if (existingResource.filePublicId) {
                const oldFilePath = path.join(__dirname, '../../public/resources', existingResource.filePublicId)
                try {
                    await fs.unlink(oldFilePath)
                } catch (err) {
                    console.error('Error deleting old file:', err)
                }
            }

            // Save new file
            const fileExtension = path.extname(req.file.originalname)
            const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(7)}${fileExtension}`
            const resourcesDir = path.join(__dirname, '../../public/resources')
            const filePath = path.join(resourcesDir, uniqueFilename)

            await fs.rename(req.file.path, filePath)

            const formatMap = {
                '.pdf': 'PDF',
                '.xlsx': 'XLSX',
                '.xls': 'XLS',
                '.pptx': 'PPTX',
                '.ppt': 'PPT',
                '.docx': 'DOCX',
                '.doc': 'DOC',
                '.zip': 'ZIP'
            }

            fileUrl = `/resources/${uniqueFilename}`
            filePublicId = uniqueFilename
            fileType = formatMap[fileExtension.toLowerCase()] || 'FILE'
            fileSize = `${(req.file.size / 1024 / 1024).toFixed(2)} MB`
        }

        const resource = await prisma.resource.update({
            where: { id },
            data: {
                category,
                title,
                description,
                imageUrl: imageUrl !== undefined ? imageUrl : existingResource.imageUrl,
                fileUrl,
                filePublicId,
                fileSize,
                fileType,
                isActive
            }
        })

        res.status(200).json({
            success: true,
            message: 'Resource updated successfully',
            data: resource
        })
    } catch (err) {
        console.error('Error updating resource:', err)
        next(err)
    }
}
]

// Delete resource
export const deleteResource =[authenticateToken, authorizeAdmin, async (req, res, next) => {
    try {
        const { id } = req.params
        const resource = await prisma.resource.findUnique({ where: { id } })

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found'
            })
        }

        // Delete file from local storage
        if (resource.filePublicId) {
            const filePath = path.join(__dirname, '../../public/resources', resource.filePublicId)
            try {
                await fs.unlink(filePath)
                console.log('🗑️ File deleted:', filePath)
            } catch (err) {
                console.error('Error deleting file:', err)
            }
        }

        // Delete from database
        await prisma.resource.delete({ where: { id } })

        res.status(200).json({
            success: true,
            message: 'Resource deleted successfully'
        })
    } catch (error) {
        console.error('Error deleting resource:', error)
        next(err)
    }
}
]

// Track download
export const trackDownload = async (req, res, next) => {
    try {
      const { email, resourceId } = req.body
      if (!email || !resourceId) return res.status(400).json({ success: false, message: "Email and resourceId required" })
  
      const resource = await prisma.resource.findUnique({ where: { id: resourceId } })
      if (!resource) return res.status(404).json({ success: false, message: "Resource not found" })
  
      const downloadRecord = await prisma.resourceDownload.create({
        data: {email, resourceId: resource.id, resourceTitle: resource.title}
      })
  
      return res.json({ success: true, download: downloadRecord })
    } catch (err) {
      next(err)
    }
  }

// Get all resources
export const getAllResources = async (req, res, next) => {
    try {
        const resources = await prisma.resource.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' }
        })

        res.status(200).json({
            success: true,
            data: resources
        })
    } catch (error) {
        console.error('Error fetching resources:', error)
        next(err)
    }
}

// Get all resources (Admin)
export const getAllResourcesAdmin =[authenticateToken, authorizeAdmin, async (req, res, next) => {
    try {
        const resources = await prisma.resource.findMany({ orderBy: { createdAt: 'desc' } })

        const resourcesWithStats = await Promise.all(
            resources.map(async (resource) => {
                const downloadCount = await prisma.resourceDownload.count({ where: { resourceId: resource.id } })
                return { ...resource, downloadCount }
            })
        )

        res.status(200).json({
            success: true,
            data: resourcesWithStats
        })
    } catch (error) {
        console.error('Error fetching resources:', error)
        next(err)
    }
}
]

// Toggle resource status
export const toggleResourceStatus =[authenticateToken, authorizeAdmin, async (req, res,next) => {
    try {
        const { id } = req.params
        const resource = await prisma.resource.findUnique({ where: { id } })

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found'
            })
        }

        const updatedResource = await prisma.resource.update({
            where: { id },
            data: { isActive: !resource.isActive }
        })

        res.status(200).json({
            success: true,
            message: `Resource ${updatedResource.isActive ? 'activated' : 'deactivated'}`,
            data: updatedResource
        })
    } catch (error) {
        console.error('Error toggling resource status:', error)
        next(err)
    }
}
]