import { prisma } from '../config/database.js'
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/uploadHelper.js'

// Create new insight with image upload
export const createInsight = async (req, res) => {
  try {
    const { category, title, description, content, imageUrl, imagePublicId } = req.body

    // Create insight in database
    const insight = await prisma.insight.create({
      data: {
        category,
        title,
        description,
        content,
        image: imageUrl || '',
        imagePublicId: imagePublicId || '',
        isActive: true
      }
    })

    res.status(201).json({
      success: true,
      message: 'Insight created successfully',
      data: insight
    })
  } catch (error) {
    console.error('Error creating insight:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create insight',
      error: error.message
    })
  }
}

// Get all insights (public - only active)
export const getAllInsights = async (req, res) => {
  try {
    const insights = await prisma.insight.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    })

    res.status(200).json({
      success: true,
      data: insights
    })
  } catch (error) {
    console.error('Error fetching insights:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch insights',
      error: error.message
    })
  }
}

// Get all insights for admin (including inactive)
export const getAllInsightsAdmin = async (req, res) => {
  try {
    const insights = await prisma.insight.findMany({
      orderBy: { createdAt: 'desc' }
    })

    res.status(200).json({
      success: true,
      data: insights
    })
  } catch (error) {
    console.error('Error fetching insights:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch insights',
      error: error.message
    })
  }
}

// Get single insight by ID
export const getInsightById = async (req, res) => {
  try {
    const { id } = req.params

    const insight = await prisma.insight.findUnique({
      where: { id }
    })

    if (!insight) {
      return res.status(404).json({
        success: false,
        message: 'Insight not found'
      })
    }

    res.status(200).json({
      success: true,
      data: insight
    })
  } catch (error) {
    console.error('Error fetching insight:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch insight',
      error: error.message
    })
  }
}

// Upload image to Cloudinary
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required'
      })
    }

    // Upload image to Cloudinary
    const uploadResult = await uploadToCloudinary(req.file, 'insights')

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        imageUrl: uploadResult.secure_url,
        imagePublicId: uploadResult.public_id
      }
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to upload image',
      error: error.message
    })
  }
}

// Update insight
export const updateInsight = async (req, res) => {
  try {
    const { id } = req.params
    const { category, title, description, content, imageUrl, imagePublicId, isActive } = req.body

    // Check if insight exists
    const existingInsight = await prisma.insight.findUnique({
      where: { id }
    })

    if (!existingInsight) {
      return res.status(404).json({
        success: false,
        message: 'Insight not found'
      })
    }

    // Update insight
    const insight = await prisma.insight.update({
      where: { id },
      data: {
        category,
        title,
        description,
        content,
        image: imageUrl || existingInsight.image,
        imagePublicId: imagePublicId || existingInsight.imagePublicId,
        isActive
      }
    })

    res.status(200).json({
      success: true,
      message: 'Insight updated successfully',
      data: insight
    })
  } catch (error) {
    console.error('Error updating insight:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update insight',
      error: error.message
    })
  }
}

// Delete insight
export const deleteInsight = async (req, res) => {
  try {
    const { id } = req.params

    // Get insight
    const insight = await prisma.insight.findUnique({
      where: { id }
    })

    if (!insight) {
      return res.status(404).json({
        success: false,
        message: 'Insight not found'
      })
    }

    // Delete insight from database
    await prisma.insight.delete({
      where: { id }
    })

    res.status(200).json({
      success: true,
      message: 'Insight deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting insight:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete insight',
      error: error.message
    })
  }
}

// Toggle insight active status
export const toggleInsightStatus = async (req, res) => {
  try {
    const { id } = req.params

    const insight = await prisma.insight.findUnique({
      where: { id }
    })

    if (!insight) {
      return res.status(404).json({
        success: false,
        message: 'Insight not found'
      })
    }

    const updatedInsight = await prisma.insight.update({
      where: { id },
      data: { isActive: !insight.isActive }
    })

    res.status(200).json({
      success: true,
      message: `Insight ${updatedInsight.isActive ? 'activated' : 'deactivated'}`,
      data: updatedInsight
    })
  } catch (error) {
    console.error('Error toggling insight status:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to toggle insight status',
      error: error.message
    })
  }
}