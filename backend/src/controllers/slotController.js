import { prisma } from '../config/database.js'

// Create a single time slot
export const createSlot = async (req, res) => {
  try {
    const { date, time } = req.body

    // Validate date format
    const slotDate = new Date(date)
    if (isNaN(slotDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format'
      })
    }

    // Check if slot already exists
    const existingSlot = await prisma.availableSlot.findFirst({
      where: {
        date: slotDate,
        time: time
      }
    })

    if (existingSlot) {
      return res.status(400).json({
        success: false,
        message: 'This time slot already exists'
      })
    }

    // Create slot
    const slot = await prisma.availableSlot.create({
      data: {
        date: slotDate,
        time,
        isBooked: false
      }
    })

    console.log('✅ Slot created:', slot.id)

    res.status(201).json({
      success: true,
      message: 'Time slot created successfully',
      data: slot
    })
  } catch (error) {
    console.error('Error creating slot:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create time slot',
      error: error.message
    })
  }
}

// Create multiple time slots
export const createMultipleSlots = async (req, res) => {
  try {
    const { dates, times } = req.body

    console.log('📥 Received request:', { dates, times })

    if (!dates || !Array.isArray(dates) || dates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Dates array is required and must not be empty'
      })
    }

    if (!times || !Array.isArray(times) || times.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Times array is required and must not be empty'
      })
    }

    const slotsCreated = []

    // Generate all combinations of dates and times
    for (const dateStr of dates) {
      const slotDate = new Date(dateStr)
      
      if (isNaN(slotDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: `Invalid date format: ${dateStr}`
        })
      }

      for (const time of times) {
        // Check if slot already exists
        const existingSlot = await prisma.availableSlot.findFirst({
          where: {
            date: slotDate,
            time: time
          }
        })

        if (!existingSlot) {
          // Create individual slot (MongoDB doesn't support createMany with skipDuplicates)
          const slot = await prisma.availableSlot.create({
            data: {
              date: slotDate,
              time,
              isBooked: false
            }
          })
          slotsCreated.push(slot)
        }
      }
    }

    if (slotsCreated.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'All specified time slots already exist'
      })
    }

    console.log(`✅ Created ${slotsCreated.length} slots`)

    res.status(201).json({
      success: true,
      message: `${slotsCreated.length} time slot(s) created successfully`,
      data: {
        count: slotsCreated.length,
        slots: slotsCreated
      }
    })
  } catch (error) {
    console.error('Error creating multiple slots:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create time slots',
      error: error.message
    })
  }
}

// Get all slots (admin only)
export const getAllSlots = async (req, res) => {
  try {
    const slots = await prisma.availableSlot.findMany({
      orderBy: [
        { date: 'asc' },
        { time: 'asc' }
      ]
    })

    console.log(`📊 Total slots in database: ${slots.length}`)

    res.status(200).json({
      success: true,
      data: slots
    })
  } catch (error) {
    console.error('Error fetching all slots:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch time slots',
      error: error.message
    })
  }
}

// Get available (unbooked) slots (public)
export const getAvailableSlots = async (req, res) => {
  try {
    console.log('🔍 Getting all unbooked slots')
    
    const slots = await prisma.availableSlot.findMany({
      where: {
        isBooked: false
        // Date filter removed - we'll add it back with proper logic later
      },
      orderBy: [
        { date: 'asc' },
        { time: 'asc' }
      ]
    })

    console.log(`📤 Found ${slots.length} slots`)
    
    if (slots.length > 0) {
      console.log(`📤 First slot:`, {
        id: slots[0].id,
        date: slots[0].date,
        time: slots[0].time
      })
    }

    res.status(200).json({
      success: true,
      data: {
        slots,
        count: slots.length
      }
    })
  } catch (error) {
    console.error('Error fetching available slots:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch available time slots',
      error: error.message
    })
  }
}

// Delete a time slot
export const deleteSlot = async (req, res) => {
  try {
    const { id } = req.params

    // Check if slot exists
    const slot = await prisma.availableSlot.findUnique({
      where: { id }
    })

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: 'Time slot not found'
      })
    }

    // Don't allow deleting booked slots
    if (slot.isBooked) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete a booked time slot'
      })
    }

    // Delete slot
    await prisma.availableSlot.delete({
      where: { id }
    })

    console.log(`🗑️ Deleted slot: ${id}`)

    res.status(200).json({
      success: true,
      message: 'Time slot deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting slot:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete time slot',
      error: error.message
    })
  }
}