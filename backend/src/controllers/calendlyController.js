import { prisma } from '../config/database.js'

//Helper for error handling
const handleError = (res, error, status = 500, message = 'An error occurred') => {
  console.error(error)
  return res.status(status).json({ success: false, message, error: error.message || error })
}

export const handleCalendlyWebhook = async (req, res) => {
  try {
    const event = req.body

    if (!event || !event.event || !event.payload) {
      return res.status(400).json({ success: false, message: 'Invalid webhook payload' })
    }

    // Calendly sends webhook events
    if (event.event === 'invitee.created') {
      const inviteeEmail = event.payload.email
      const scheduledEventUrl = event.payload.event
      const scheduledTime = new Date(event.payload.scheduled_event.start_time)

      // Find consultation application by email
      const consultation = await prisma.consultationApplication.findFirst({
        where: {
          businessEmail: inviteeEmail,
          calendlyScheduled: false
        },
        orderBy: { submittedAt: 'desc' }
      })

      if (consultation) {
        // Update with Calendly details
        await prisma.consultationApplication.update({
          where: { id: consultation.id },
          data: {
            calendlyScheduled: true,
            calendlyEventUrl: scheduledEventUrl,
            scheduledDate: scheduledTime
          }
        })
      } else {
        console.log(`No pending consultation found for email: ${inviteeEmail}`)
      }
    }
    return res.status(200).json({ success: true, message: 'Webhook processed successfully' })
  } catch (error) {
    return handleError(res, error, 500, 'Calendly webhook processing failed')
  }
}