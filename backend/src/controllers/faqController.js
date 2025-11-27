import { prisma } from '../config/database.js'

// Get all FAQs (public - only active ones)
export const getAllFAQs = async (req, res) => {
  try {
    const faqs = await prisma.fAQ.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    })

    res.status(200).json({
      success: true,
      data: faqs
    })
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch FAQs',
      error: error.message
    })
  }
}

// Get all FAQs (admin - including inactive)
export const getAllFAQsAdmin = async (req, res) => {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: { createdAt: 'desc' }
    })

    res.status(200).json({
      success: true,
      data: faqs
    })
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch FAQs',
      error: error.message
    })
  }
}

// Create FAQ
export const createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body

    const faq = await prisma.fAQ.create({
      data: {
        question,
        answer,
        isActive: true
      }
    })

    res.status(201).json({
      success: true,
      message: 'FAQ created successfully',
      data: faq
    })
  } catch (error) {
    console.error('Error creating FAQ:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create FAQ',
      error: error.message
    })
  }
}

// Update FAQ
export const updateFAQ = async (req, res) => {
  try {
    const { id } = req.params
    const { question, answer, isActive } = req.body

    const faq = await prisma.fAQ.update({
      where: { id },
      data: {
        question,
        answer,
        ...(isActive !== undefined && { isActive })
      }
    })

    res.status(200).json({
      success: true,
      message: 'FAQ updated successfully',
      data: faq
    })
  } catch (error) {
    console.error('Error updating FAQ:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update FAQ',
      error: error.message
    })
  }
}

// Delete FAQ
export const deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params

    await prisma.fAQ.delete({
      where: { id }
    })

    res.status(200).json({
      success: true,
      message: 'FAQ deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting FAQ:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete FAQ',
      error: error.message
    })
  }
}

// Toggle FAQ status
export const toggleFAQStatus = async (req, res) => {
  try {
    const { id } = req.params

    const faq = await prisma.fAQ.findUnique({
      where: { id }
    })

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found'
      })
    }

    const updatedFAQ = await prisma.fAQ.update({
      where: { id },
      data: { isActive: !faq.isActive }
    })

    res.status(200).json({
      success: true,
      message: `FAQ ${updatedFAQ.isActive ? 'activated' : 'deactivated'}`,
      data: updatedFAQ
    })
  } catch (error) {
    console.error('Error toggling FAQ status:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to toggle FAQ status',
      error: error.message
    })
  }
}