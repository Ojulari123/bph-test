// import { Resend } from 'resend'

// const resend = new Resend(process.env.RESEND_API_KEY)

// export const sendEmail = async ({ to, subject, html }) => {
//   try {
//     const { data, error } = await resend.emails.send({
//       from: process.env.FROM_EMAIL || 'BPH Growth <noreply@yourdomain.com>',
//       to: Array.isArray(to) ? to : [to],
//       subject,
//       html,
//     })

//     if (error) {
//       console.error('❌ Email send error:', error)
//       throw new Error(error.message)
//     }

//     console.log('✅ Email sent successfully:', data)
//     return data
//   } catch (error) {
//     console.error('❌ Failed to send email:', error)
//     throw error
//   }
// }

// export default resend

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Send email to CUSTOMER (automated emails)
 * FROM: noreply@bphgrowth.com
 * REPLY-TO: support@bphgrowth.com
 */
export const sendCustomerEmail = async ({ to, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM_NOREPLY || 'BPH Growth <noreply@bphgrowth.com>',
      to: Array.isArray(to) ? to : [to],
      replyTo: process.env.EMAIL_SUPPORT || 'support@bphgrowth.com',
      subject,
      html,
    })

    if (error) {
      console.error('❌ Customer email error:', error)
      throw new Error(error.message)
    }

    console.log('✅ Customer email sent:', data?.id)
    return data
  } catch (error) {
    console.error('❌ Failed to send customer email:', error)
    throw error
  }
}

/**
 * Send email to ADMIN (alerts/notifications)
 * FROM: noreply@bphgrowth.com
 * TO: support@bphgrowth.com (or specified admin email)
 */
export const sendAdminEmail = async ({ to, subject, html }) => {
  try {
    const adminEmail = to || process.env.EMAIL_ADMIN || 'support@bphgrowth.com'
    
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM_NOREPLY || 'BPH Growth System <noreply@bphgrowth.com>',
      to: Array.isArray(adminEmail) ? adminEmail : [adminEmail],
      subject,
      html,
    })

    if (error) {
      console.error('❌ Admin email error:', error)
      throw new Error(error.message)
    }

    console.log('✅ Admin email sent:', data?.id)
    return data
  } catch (error) {
    console.error('❌ Failed to send admin email:', error)
    throw error
  }
}

/**
 * Legacy sendEmail function - kept for backward compatibility
 * Defaults to customer email behavior
 */
export const sendEmail = async ({ to, subject, html, isAdminEmail = false }) => {
  if (isAdminEmail) {
    return sendAdminEmail({ to, subject, html })
  } else {
    return sendCustomerEmail({ to, subject, html })
  }
}

export default resend