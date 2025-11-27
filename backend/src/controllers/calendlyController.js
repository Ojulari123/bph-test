import { prisma } from '../config/database.js'

export const handleCalendlyWebhook = async (req, res) => {
  try {
    const event = req.body

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
        orderBy: {
          submittedAt: 'desc'
        }
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
      }
    }

    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Calendly webhook error:', error)
    res.status(500).json({ success: false })
  }
}