// ==================== CONSULTATION EMAIL TEMPLATES ====================

// Consultation User Confirmation Email (after submission)
export const consultationUserTemplate = ({ fullName, scheduledDate, scheduledTime, companyName }) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #0a2540; color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 32px; font-weight: 400; }
        .content { padding: 40px 30px; background-color: #ffffff; }
        .content p { margin: 0 0 15px 0; font-size: 16px; line-height: 1.6; color: #333; }
        .content strong { font-weight: 600; }
        .info-section { margin: 25px 0; }
        .info-section h3 { margin: 0 0 15px 0; color: #0a2540; font-size: 18px; font-weight: 600; }
        .info-section p { margin: 8px 0; }
        .content ul { margin: 15px 0; padding-left: 20px; }
        .content li { margin: 8px 0; }
        .footer { background-color: #0a2540; color: #ffffff; padding: 30px; }
        .footer-content { text-align: center; }
        .footer-content p { margin: 5px 0; font-size: 18px; font-weight: 600; }
        .footer-content a { color: #ffffff; text-decoration: none; font-size: 14px; }
        .social-links { text-align: center; margin-top: 15px; }
        .social-links a { color: #ffffff; text-decoration: none; font-size: 14px; margin: 0 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Consultation Scheduled</h1>
        </div>
        <div class="content">
          <p>Dear ${fullName},</p>
          
          <p>Thank you for scheduling a consultation with BPH Growth. We've received your request and are excited to discuss how we can help <strong>${companyName}</strong> grow.</p>
          
          <div class="info-section">
            <h3>Consultation Details:</h3>
            <p><strong>Date:</strong> ${new Date(scheduledDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Time:</strong> ${scheduledTime}</p>
            <p><strong>Status:</strong> Pending Confirmation</p>
          </div>
          
          <p>Our team will review your application and confirm your consultation within 24-48 hours. You'll receive an email once your consultation is approved.</p>
          
          <div class="info-section">
            <h3>What to Prepare;</h3>
            <ul>
              <li>Your business goals and challenges</li>
              <li>Any relevant business documents or data</li>
              <li>Questions about our services</li>
              <li>Information about your target market</li>
            </ul>
          </div>
          
          <p>If you have any immediate questions, please don't hesitate to reach out to us at support@bphgrowth.com</p>
          
          <p style="margin-top: 30px;">Looking forward to working with you,<br>The BPH Growth Team</p>
        </div>
        <div class="footer">
          <div class="footer-content">
            <p>BPH Growth</p>
            <a href="mailto:support@bphgrowth.com">support@bphgrowth.com</a>
          </div>
          <div class="social-links">
            <a href="https://www.instagram.com/businessplans.hub/">Instagram</a> | 
            <a href="https://www.facebook.com/businessplans.hub">Facebook</a> | 
            <a href="https://www.linkedin.com/company/thebusinessplanhub">LinkedIn</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

// Consultation Admin Notification Email
export const consultationAdminTemplate = ({ fullName, businessEmail, companyName, industrySector, scheduledDate, scheduledTime, businessSummary }) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #0a2540; color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 400; }
        .content { padding: 30px; background-color: #ffffff; }
        .content h2 { color: #0a2540; font-size: 20px; margin: 0 0 20px 0; }
        .info-box { background: #f8f9fa; padding: 15px; margin: 15px 0; border-radius: 4px; }
        .info-box p { margin: 8px 0; }
        .info-box strong { color: #0a2540; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Consultation Request</h1>
        </div>
        <div class="content">
          <h2>Consultation Application Received</h2>
          
          <div class="info-box">
            <p><strong>Applicant:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${businessEmail}</p>
            <p><strong>Company:</strong> ${companyName}</p>
            <p><strong>Industry:</strong> ${industrySector}</p>
          </div>
          
          <div class="info-box">
            <p><strong>Scheduled Date:</strong> ${new Date(scheduledDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Scheduled Time:</strong> ${scheduledTime}</p>
          </div>
          
          <div class="info-box">
            <p><strong>Business Summary:</strong></p>
            <p>${businessSummary}</p>
          </div>
          
          <p>Please log in to the admin dashboard to review and approve/deny this consultation request.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Consultation Approval Email
export const consultationApprovalTemplate = ({ fullName, scheduledDate, scheduledTime, companyName }) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #0a2540; color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 32px; font-weight: 400; }
        .content { padding: 40px 30px; background-color: #ffffff; }
        .content p { margin: 0 0 15px 0; font-size: 16px; line-height: 1.6; color: #333; }
        .content strong { font-weight: 600; }
        .info-section { margin: 25px 0; }
        .info-section h3 { margin: 0 0 15px 0; color: #0a2540; font-size: 18px; font-weight: 600; }
        .info-section p { margin: 8px 0; }
        .content ul { margin: 15px 0; padding-left: 20px; }
        .content li { margin: 8px 0; }
        .footer { background-color: #0a2540; color: #ffffff; padding: 30px; position: relative; }
        .footer-content { text-align: center; }
        .footer-content p { margin: 5px 0; font-size: 18px; font-weight: 600; }
        .footer-content a { color: #ffffff; text-decoration: none; font-size: 14px; }
        .social-links { text-align: center; margin-top: 15px; }
        .social-links a { color: #ffffff; text-decoration: none; font-size: 14px; margin: 0 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Consultation Approved</h1>
        </div>
        <div class="content">
          <p>Dear ${fullName},</p>
          
          <p>We are pleased to inform you that your consultation request for <strong>${companyName}</strong> has been approved.</p>
          
          <div class="info-section">
            <h3>Consultation Details:</h3>
            <p><strong>Date:</strong> ${new Date(scheduledDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Time:</strong> ${scheduledTime}</p>
          </div>
          
          <p>We're excited to meet with you and discuss how BPH Growth can help your business thrive!</p>
          
          <div class="info-section">
            <h3>Before Your Consultation;</h3>
            <ul>
              <li>Review your business goals and challenges</li>
              <li>Prepare any questions about our services</li>
              <li>Gather relevant business documents or data</li>
              <li>Be ready to discuss your growth strategy</li>
            </ul>
          </div>
          
          <div class="info-section">
            <h3>Meeting Format;</h3>
            <p>Our team will reach out to you via email or phone 24 hours before the consultation to confirm the meeting format and provide any necessary joining details.</p>
          </div>
          
          <p>If you need to reschedule or have any questions, please contact us at support@bphgrowth.com</p>
          
          <p style="margin-top: 30px;">Looking forward to working with you,<br>The BPH Growth Team</p>
        </div>
        <div class="footer">
          <div class="footer-content">
            <p>BPH Growth</p>
            <a href="mailto:support@bphgrowth.com">support@bphgrowth.com</a>
          </div>
          <div class="social-links">
            <a href="https://www.instagram.com/businessplans.hub/">Instagram</a> | 
            <a href="https://www.facebook.com/businessplans.hub">Facebook</a> | 
            <a href="https://www.linkedin.com/company/thebusinessplanhub">LinkedIn</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

// Consultation Denial Email
export const consultationDenialTemplate = ({ fullName, companyName }) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #0a2540; color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 32px; font-weight: 400; }
        .content { padding: 40px 30px; background-color: #ffffff; }
        .content p { margin: 0 0 15px 0; font-size: 16px; line-height: 1.6; color: #333; }
        .content strong { font-weight: 600; }
        .info-section { margin: 25px 0; }
        .info-section h3 { margin: 0 0 15px 0; color: #0a2540; font-size: 18px; font-weight: 600; }
        .content ul { margin: 15px 0; padding-left: 20px; }
        .content li { margin: 8px 0; }
        .footer { background-color: #0a2540; color: #ffffff; padding: 30px; position: relative; }
        .footer-content { text-align: center; }
        .footer-content p { margin: 5px 0; font-size: 18px; font-weight: 600; }
        .footer-content a { color: #ffffff; text-decoration: none; font-size: 14px; }
        .social-links { text-align: center; margin-top: 15px; }
        .social-links a { color: #ffffff; text-decoration: none; font-size: 14px; margin: 0 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Consultation Status Update</h1>
        </div>
        <div class="content">
          <p>Dear ${fullName},</p>
          
          <p>Thank you for your interest in BPH Growth consultation services for <strong>${companyName}</strong>.</p>
          
          <p>After reviewing your application, we're unable to schedule a consultation at this time due to capacity constraints or service fit considerations.</p>
          
          <div class="info-section">
            <h3>We're Still Here to Help!</h3>
            <p>While we can't offer a consultation right now, there are other ways we can support your business growth:</p>
            <ul>
              <li>Free Resources - Access our library of business templates and guides</li>
              <li>Business Insights - Read our latest articles on growth strategies</li>
              <li>Self-Service Tools - Use our planning and financial tools</li>
              <li>Apply Again - You're welcome to reapply when we have more availability</li>
            </ul>
          </div>
          
          <p>We appreciate your understanding and encourage you to stay connected with BPH Growth through our resources and content.</p>
          
          <p>For any questions, feel free to reach out to us at support@bphgrowth.com</p>
          
          <p style="margin-top: 30px;">Best regards,<br>The BPH Growth Team</p>
        </div>
        <div class="footer">
          <div class="footer-content">
            <p>BPH Growth</p>
            <a href="mailto:support@bphgrowth.com">support@bphgrowth.com</a>
          </div>
          <div class="social-links">
            <a href="https://www.instagram.com/businessplans.hub/">Instagram</a> | 
            <a href="https://www.facebook.com/businessplans.hub">Facebook</a> | 
            <a href="https://www.linkedin.com/company/thebusinessplanhub">LinkedIn</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

// ==================== PERSONAL LOAN EMAIL TEMPLATES ====================

// Personal Loan User Confirmation Email
export const personalLoanUserTemplate = ({ fullName, loanAmount }) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #0a2540; color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 32px; font-weight: 400; }
        .content { padding: 40px 30px; background-color: #ffffff; }
        .content p { margin: 0 0 15px 0; font-size: 16px; line-height: 1.6; color: #333; }
        .content strong { font-weight: 600; }
        .info-section { margin: 25px 0; }
        .info-section h3 { margin: 0 0 15px 0; color: #0a2540; font-size: 18px; font-weight: 600; }
        .info-section p { margin: 8px 0; }
        .content ul { margin: 15px 0; padding-left: 20px; }
        .content li { margin: 8px 0; }
        .footer { background-color: #0a2540; color: #ffffff; padding: 30px; position: relative; }
        .footer-content { text-align: center; }
        .footer-content p { margin: 5px 0; font-size: 18px; font-weight: 600; }
        .footer-content a { color: #ffffff; text-decoration: none; font-size: 14px; }
        .social-links { text-align: center; margin-top: 15px; }
        .social-links a { color: #ffffff; text-decoration: none; font-size: 14px; margin: 0 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Loan Application Received</h1>
        </div>
        <div class="content">
          <p>Dear ${fullName},</p>
          
          <p>Thank you for submitting your personal loan application with BPH Growth. We've successfully received your request.</p>
          
          <div class="info-section">
            <h3>Application Summary:</h3>
            <p><strong>Applicant:</strong> ${fullName}</p>
            <p><strong>Loan Type:</strong> Personal Loan</p>
            <p><strong>Loan Amount:</strong> ${loanAmount}</p>
            <p><strong>Status:</strong> Under Review</p>
          </div>
          
          <p>Our loan specialists are reviewing your application and will get back to you within 3-5 business days.</p>
          
          <div class="info-section">
            <h3>Next Steps:</h3>
            <ul>
              <li>Our team will review your application and supporting documents</li>
              <li>We may contact you for additional information if needed</li>
              <li>You'll receive an email once a decision has been made</li>
            </ul>
          </div>
          
          <p>If you have any questions in the meantime, please contact us at support@bphgrowth.com</p>
          
          <p style="margin-top: 30px;">Best regards,<br>The BPH Growth Loan Team</p>
        </div>
        <div class="footer">
          <div class="footer-content">
            <p>BPH Growth</p>
            <a href="mailto:support@bphgrowth.com">support@bphgrowth.com</a>
          </div>
          <div class="social-links">
            <a href="https://www.instagram.com/businessplans.hub/">Instagram</a> | 
            <a href="https://www.facebook.com/businessplans.hub">Facebook</a> | 
            <a href="https://www.linkedin.com/company/thebusinessplanhub">LinkedIn</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

// Personal Loan Admin Notification
export const personalLoanAdminTemplate = ({ fullName, email, loanAmount, purposeOfLoan }) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #0a2540; color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 400; }
        .content { padding: 30px; background-color: #ffffff; }
        .content h2 { color: #0a2540; font-size: 20px; margin: 0 0 20px 0; }
        .info-box { background: #f8f9fa; padding: 15px; margin: 15px 0; border-radius: 4px; }
        .info-box p { margin: 8px 0; }
        .info-box strong { color: #0a2540; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Personal Loan Application</h1>
        </div>
        <div class="content">
          <h2>Personal Loan Application Received</h2>
          
          <div class="info-box">
            <p><strong>Applicant:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Loan Type:</strong> Personal Loan</p>
            <p><strong>Loan Amount:</strong> ${loanAmount}</p>
          </div>
          
          <div class="info-box">
            <p><strong>Purpose of Loan:</strong></p>
            <p>${purposeOfLoan}</p>
          </div>
          
          <p>Please log in to the admin dashboard to review this loan application.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Personal Loan Approval
export const personalLoanApprovalTemplate = ({ fullName, loanAmount }) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #0a2540; color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 32px; font-weight: 400; }
        .content { padding: 40px 30px; background-color: #ffffff; }
        .content p { margin: 0 0 15px 0; font-size: 16px; line-height: 1.6; color: #333; }
        .content strong { font-weight: 600; }
        .info-section { margin: 25px 0; }
        .info-section h3 { margin: 0 0 15px 0; color: #0a2540; font-size: 18px; font-weight: 600; }
        .info-section p { margin: 8px 0; }
        .content ul { margin: 15px 0; padding-left: 20px; }
        .content li { margin: 8px 0; }
        .footer { background-color: #0a2540; color: #ffffff; padding: 30px; position: relative; }
        .footer-content { text-align: center; }
        .footer-content p { margin: 5px 0; font-size: 18px; font-weight: 600; }
        .footer-content a { color: #ffffff; text-decoration: none; font-size: 14px; }
        .social-links { text-align: center; margin-top: 15px; }
        .social-links a { color: #ffffff; text-decoration: none; font-size: 14px; margin: 0 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Loan Application Approved</h1>
        </div>
        <div class="content">
          <p>Dear ${fullName},</p>
          
          <p>Congratulations! Your personal loan application has been approved!</p>
          
          <div class="info-section">
            <h3>Approved Loan Details:</h3>
            <p><strong>Loan Type:</strong> Personal Loan</p>
            <p><strong>Approved Amount:</strong> ${loanAmount}</p>
            <p><strong>Status:</strong> Approved - Pending Documentation</p>
          </div>
          
          <div class="info-section">
            <h3>Next Steps:</h3>
            <ul>
              <li>Our loan specialist will contact you within 24 hours</li>
              <li>You'll need to complete final documentation</li>
              <li>Loan disbursement process will be explained</li>
              <li>Terms and conditions will be provided</li>
            </ul>
          </div>
          
          <p>We're thrilled to support your financial needs!</p>
          
          <p>If you have immediate questions, please contact our loan team at support@bphgrowth.com</p>
          
          <p style="margin-top: 30px;">Congratulations and best wishes,<br>The BPH Growth Loan Team</p>
        </div>
        <div class="footer">
          <div class="footer-content">
            <p>BPH Growth</p>
            <a href="mailto:support@bphgrowth.com">support@bphgrowth.com</a>
          </div>
          <div class="social-links">
            <a href="https://www.instagram.com/businessplans.hub/">Instagram</a> | 
            <a href="https://www.facebook.com/businessplans.hub">Facebook</a> | 
            <a href="https://www.linkedin.com/company/thebusinessplanhub">LinkedIn</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

// Personal Loan Denial
export const personalLoanDenialTemplate = ({ fullName }) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #0a2540; color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 32px; font-weight: 400; }
        .content { padding: 40px 30px; background-color: #ffffff; }
        .content p { margin: 0 0 15px 0; font-size: 16px; line-height: 1.6; color: #333; }
        .content strong { font-weight: 600; }
        .info-section { margin: 25px 0; }
        .info-section h3 { margin: 0 0 15px 0; color: #0a2540; font-size: 18px; font-weight: 600; }
        .content ul { margin: 15px 0; padding-left: 20px; }
        .content li { margin: 8px 0; }
        .footer { background-color: #0a2540; color: #ffffff; padding: 30px; position: relative; }
        .footer-content { text-align: center; }
        .footer-content p { margin: 5px 0; font-size: 18px; font-weight: 600; }
        .footer-content a { color: #ffffff; text-decoration: none; font-size: 14px; }
        .social-links { text-align: center; margin-top: 15px; }
        .social-links a { color: #ffffff; text-decoration: none; font-size: 14px; margin: 0 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Loan Application Update</h1>
        </div>
        <div class="content">
          <p>Dear ${fullName},</p>
          
          <p>Thank you for applying for a personal loan with BPH Growth.</p>
          
          <p>After careful review of your application, we're unable to approve your loan request at this time. This decision is based on our current lending criteria and assessment.</p>
          
          <div class="info-section">
            <h3>Alternative Options:</h3>
            <ul>
              <li>Reapply Later - You can reapply after 6 months with updated information</li>
              <li>Financial Consultation - Schedule a consultation to improve your financial profile</li>
              <li>Financial Planning Resources - Access our free financial planning tools</li>
              <li>Credit Building Tips - Learn how to strengthen your credit profile</li>
            </ul>
          </div>
          
          <p>We appreciate your interest in BPH Growth and encourage you to stay connected with us.</p>
          
          <p>For questions, contact us at support@bphgrowth.com</p>
          
          <p style="margin-top: 30px;">Best regards,<br>The BPH Growth Loan Team</p>
        </div>
        <div class="footer">
          <div class="footer-content">
            <p>BPH Growth</p>
            <a href="mailto:support@bphgrowth.com">support@bphgrowth.com</a>
          </div>
          <div class="social-links">
            <a href="https://www.instagram.com/businessplans.hub/">Instagram</a> | 
            <a href="https://www.facebook.com/businessplans.hub">Facebook</a> | 
            <a href="https://www.linkedin.com/company/thebusinessplanhub">LinkedIn</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

// ==================== BUSINESS LOAN EMAIL TEMPLATES ====================

// Business Loan User Confirmation Email
export const businessLoanUserTemplate = ({ fullName, businessName, loanAmount }) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #0a2540; color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 32px; font-weight: 400; }
        .content { padding: 40px 30px; background-color: #ffffff; }
        .content p { margin: 0 0 15px 0; font-size: 16px; line-height: 1.6; color: #333; }
        .content strong { font-weight: 600; }
        .info-section { margin: 25px 0; }
        .info-section h3 { margin: 0 0 15px 0; color: #0a2540; font-size: 18px; font-weight: 600; }
        .info-section p { margin: 8px 0; }
        .content ul { margin: 15px 0; padding-left: 20px; }
        .content li { margin: 8px 0; }
        .footer { background-color: #0a2540; color: #ffffff; padding: 30px; position: relative; }
        .footer-content { text-align: center; }
        .footer-content p { margin: 5px 0; font-size: 18px; font-weight: 600; }
        .footer-content a { color: #ffffff; text-decoration: none; font-size: 14px; }
        .social-links { text-align: center; margin-top: 15px; }
        .social-links a { color: #ffffff; text-decoration: none; font-size: 14px; margin: 0 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Loan Application Received</h1>
        </div>
        <div class="content">
          <p>Dear ${fullName},</p>
          
          <p>Thank you for submitting your business loan application with BPH Growth. We've successfully received your request for <strong>${businessName}</strong>.</p>
          
          <div class="info-section">
            <h3>Application Summary:</h3>
            <p><strong>Business:</strong> ${businessName}</p>
            <p><strong>Loan Type:</strong> Business Loan</p>
            <p><strong>Loan Amount:</strong> ${loanAmount}</p>
            <p><strong>Status:</strong> Under Review</p>
          </div>
          
          <p>Our loan specialists are reviewing your application and will get back to you within 3-5 business days.</p>
          
          <div class="info-section">
            <h3>Next Steps:</h3>
            <ul>
              <li>Our team will review your application and supporting documents</li>
              <li>We may contact you for additional information if needed</li>
              <li>You'll receive an email once a decision has been made</li>
            </ul>
          </div>
          
          <p>If you have any questions in the meantime, please contact us at support@bphgrowth.com</p>
          
          <p style="margin-top: 30px;">Best regards,<br>The BPH Growth Loan Team</p>
        </div>
        <div class="footer">
          <div class="footer-content">
            <p>BPH Growth</p>
            <a href="mailto:support@bphgrowth.com">support@bphgrowth.com</a>
          </div>
          <div class="social-links">
            <a href="https://www.instagram.com/businessplans.hub/">Instagram</a> | 
            <a href="https://www.facebook.com/businessplans.hub">Facebook</a> | 
            <a href="https://www.linkedin.com/company/thebusinessplanhub">LinkedIn</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

// Business Loan Admin Notification
export const businessLoanAdminTemplate = ({ fullName, businessEmail, businessName, loanAmount, businessPurpose }) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #0a2540; color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 400; }
        .content { padding: 30px; background-color: #ffffff; }
        .content h2 { color: #0a2540; font-size: 20px; margin: 0 0 20px 0; }
        .info-box { background: #f8f9fa; padding: 15px; margin: 15px 0; border-radius: 4px; }
        .info-box p { margin: 8px 0; }
        .info-box strong { color: #0a2540; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Business Loan Application</h1>
        </div>
        <div class="content">
          <h2>Business Loan Application Received</h2>
          
          <div class="info-box">
            <p><strong>Applicant:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${businessEmail}</p>
            <p><strong>Business:</strong> ${businessName}</p>
            <p><strong>Loan Amount:</strong> ${loanAmount}</p>
          </div>
          
          <div class="info-box">
            <p><strong>Business Purpose:</strong></p>
            <p>${businessPurpose}</p>
          </div>
          
          <p>Please log in to the admin dashboard to review this loan application.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Business Loan Approval
export const businessLoanApprovalTemplate = ({ fullName, businessName, loanAmount }) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #0a2540; color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 32px; font-weight: 400; }
        .content { padding: 40px 30px; background-color: #ffffff; }
        .content p { margin: 0 0 15px 0; font-size: 16px; line-height: 1.6; color: #333; }
        .content strong { font-weight: 600; }
        .info-section { margin: 25px 0; }
        .info-section h3 { margin: 0 0 15px 0; color: #0a2540; font-size: 18px; font-weight: 600; }
        .info-section p { margin: 8px 0; }
        .content ul { margin: 15px 0; padding-left: 20px; }
        .content li { margin: 8px 0; }
        .footer { background-color: #0a2540; color: #ffffff; padding: 30px; position: relative; }
        .footer-content { text-align: center; }
        .footer-content p { margin: 5px 0; font-size: 18px; font-weight: 600; }
        .footer-content a { color: #ffffff; text-decoration: none; font-size: 14px; }
        .social-links { text-align: center; margin-top: 15px; }
        .social-links a { color: #ffffff; text-decoration: none; font-size: 14px; margin: 0 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Loan Application Approved</h1>
        </div>
        <div class="content">
          <p>Dear ${fullName},</p>
          
          <p>Congratulations! Your loan application for <strong>${businessName}</strong> has been approved!</p>
          
          <div class="info-section">
            <h3>Approved Loan Details:</h3>
            <p><strong>Business Name:</strong> ${businessName}</p>
            <p><strong>Approved Amount:</strong> ${loanAmount}</p>
            <p><strong>Status:</strong> Approved - Pending Documentation</p>
          </div>
          
          <div class="info-section">
            <h3>Next Steps:</h3>
            <ul>
              <li>Our loan specialist will contact you within 24 hours</li>
              <li>You'll need to complete final documentation</li>
              <li>Loan disbursement process will be explained</li>
              <li>Terms and conditions will be provided</li>
            </ul>
          </div>
          
          <p>This is an exciting step for <strong>${businessName}</strong>! We're thrilled to support your business growth.</p>
          
          <p>If you have immediate questions, please contact our loan team at support@bphgrowth.com</p>
          
          <p style="margin-top: 30px;">Congratulations and best wishes,<br>The BPH Growth Loan Team</p>
        </div>
        <div class="footer">
          <div class="footer-content">
            <p>BPH Growth</p>
            <a href="mailto:support@bphgrowth.com">support@bphgrowth.com</a>
          </div>
          <div class="social-links">
            <a href="https://www.instagram.com/businessplans.hub/">Instagram</a> | 
            <a href="https://www.facebook.com/businessplans.hub">Facebook</a> | 
            <a href="https://www.linkedin.com/company/thebusinessplanhub">LinkedIn</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

// Business Loan Denial
export const businessLoanDenialTemplate = ({ fullName, businessName }) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #0a2540; color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 32px; font-weight: 400; }
        .content { padding: 40px 30px; background-color: #ffffff; }
        .content p { margin: 0 0 15px 0; font-size: 16px; line-height: 1.6; color: #333; }
        .content strong { font-weight: 600; }
        .info-section { margin: 25px 0; }
        .info-section h3 { margin: 0 0 15px 0; color: #0a2540; font-size: 18px; font-weight: 600; }
        .content ul { margin: 15px 0; padding-left: 20px; }
        .content li { margin: 8px 0; }
        .footer { background-color: #0a2540; color: #ffffff; padding: 30px; position: relative; }
        .footer-content { text-align: center; }
        .footer-content p { margin: 5px 0; font-size: 18px; font-weight: 600; }
        .footer-content a { color: #ffffff; text-decoration: none; font-size: 14px; }
        .social-links { text-align: center; margin-top: 15px; }
        .social-links a { color: #ffffff; text-decoration: none; font-size: 14px; margin: 0 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Loan Application Update</h1>
        </div>
        <div class="content">
          <p>Dear ${fullName},</p>
          
          <p>Thank you for applying for business financing with BPH Growth for <strong>${businessName}</strong>.</p>
          
          <p>After careful review of your application, we're unable to approve your loan request at this time. This decision is based on our current lending criteria and business assessment.</p>
          
          <div class="info-section">
            <h3>Alternative Options:</h3>
            <ul>
              <li>Reapply Later - You can reapply after 6 months with updated financials</li>
              <li>Business Consultation - Schedule a free consultation to improve your business profile</li>
              <li>Financial Planning - Access our resources to strengthen your financial position</li>
              <li>Alternative Funding - Explore other financing options we can recommend</li>
            </ul>
          </div>
          
          <p>We appreciate your interest in BPH Growth and encourage you to stay connected with us. Our team is here to support your business growth in other ways.</p>
          
          <p>For questions or to discuss alternative options, contact us at support@bphgrowth.com</p>
          
          <p style="margin-top: 30px;">Best regards,<br>The BPH Growth Loan Team</p>
        </div>
        <div class="footer">
          <div class="footer-content">
            <p>BPH Growth</p>
            <a href="mailto:support@bphgrowth.com">support@bphgrowth.com</a>
          </div>
          <div class="social-links">
            <a href="https://www.instagram.com/businessplans.hub/">Instagram</a> | 
            <a href="https://www.facebook.com/businessplans.hub">Facebook</a> | 
            <a href="https://www.linkedin.com/company/thebusinessplanhub">LinkedIn</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

// ==================== RESOURCE DOWNLOAD EMAIL TEMPLATE ====================

export const resourceDownloadTemplate = ({ email, resourceTitle, downloadUrl }) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #0a2540; color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 32px; font-weight: 400; }
        .content { padding: 40px 30px; background-color: #ffffff; }
        .content p { margin: 0 0 15px 0; font-size: 16px; line-height: 1.6; color: #333; }
        .content strong { font-weight: 600; }
        .resource-title { color: #0a2540; font-size: 18px; font-weight: 600; margin: 20px 0 10px 0; }
        .download-button { display: inline-block; background-color: #0a2540; color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
        .button-container { text-align: center; margin: 25px 0; }
        .info-section { margin: 25px 0; }
        .info-section h3 { margin: 0 0 15px 0; color: #0a2540; font-size: 18px; font-weight: 600; }
        .content ul { margin: 15px 0; padding-left: 20px; }
        .content li { margin: 8px 0; }
        .footer { background-color: #0a2540; color: #ffffff; padding: 30px; position: relative; }
        .footer-content { text-align: center; }
        .footer-content p { margin: 5px 0; font-size: 18px; font-weight: 600; }
        .footer-content a { color: #ffffff; text-decoration: none; font-size: 14px; }
        .social-links { text-align: center; margin-top: 15px; }
        .social-links a { color: #ffffff; text-decoration: none; font-size: 14px; margin: 0 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Your Resource is Ready</h1>
        </div>
        <div class="content">
          <p>Hello!</p>
          
          <p>Thank you for downloading from BPH Growth. We're excited to share this valuable resource with you!</p>
          
          <p class="resource-title">${resourceTitle}</p>
          <p>This resource is now available for download. Click the button below to access your file.</p>
          
          <div class="button-container">
            <a href="${downloadUrl}" class="download-button">Download Now</a>
          </div>
          
          <p style="text-align: center; color: #888; font-size: 14px;">The download link will open in your browser and the file will download automatically.</p>
          
          <div class="info-section">
            <h3>Get More from BPH Growth</h3>
            <ul>
              <li>Free Business Templates - Access more resources in our Resource Center</li>
              <li>Expert Insights - Read our latest business growth strategies</li>
              <li>Free Consultation - Schedule a call with our business experts</li>
              <li>Loan Assistance - Get help securing funding for your business</li>
            </ul>
          </div>
          
          <p>If you have any questions or need assistance, feel free to reach out to us at support@bphgrowth.com</p>
          
          <p style="margin-top: 30px;">Best regards,<br>The BPH Growth Team</p>
        </div>
        <div class="footer">
          <div class="footer-content">
            <p>BPH Growth</p>
            <a href="mailto:support@bphgrowth.com">support@bphgrowth.com</a>
          </div>
          <div class="social-links">
            <a href="https://www.instagram.com/businessplans.hub/">Instagram</a> | 
            <a href="https://www.facebook.com/businessplans.hub">Facebook</a> | 
            <a href="https://www.linkedin.com/company/thebusinessplanhub">LinkedIn</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}