// import { prisma } from '../config/database.js'
// import { sendEmail } from '../config/email.js'
// import {
//   personalLoanUserTemplate,
//   personalLoanAdminTemplate,
//   personalLoanApprovalTemplate,
//   personalLoanDenialTemplate,
//   businessLoanUserTemplate,
//   businessLoanAdminTemplate,
//   businessLoanApprovalTemplate,
//   businessLoanDenialTemplate
// } from '../utils/emailTemplates.js'

// // Helper function to determine if it's a personal loan (case-insensitive)
// const isPersonalLoan = (loanType) => {
//   if (!loanType) return false
  
//   const normalizedType = loanType.toLowerCase().trim()
  
//   // Check if it contains "personal" (covers "Personal Loans", "Personal Loan", "Personal Asset Financing")
//   if (normalizedType.includes('personal')) {
//     return true
//   }
  
//   return false
// }

// // Submit loan application
// export const submitLoan = async (req, res) => {
//   try {
//     const loanData = req.body

//     // Extract email - handle both 'email' and 'businessEmail' field names
//     const userEmail = loanData.businessEmail || loanData.email
//     const loanType = loanData.loanType

//     console.log('📥 Loan submission:', { 
//       fullName: loanData.fullName, 
//       email: userEmail,
//       loanType: loanType,
//       isPersonal: isPersonalLoan(loanType)
//     })

//     // Save to database
//     const loan = await prisma.loanApplication.create({
//       data: loanData
//     })

//     console.log('✅ Loan created:', loan.id)

//     // Send confirmation emails based on loan type
//     try {
//       if (isPersonalLoan(loanType)) {
//         // PERSONAL LOAN EMAILS
//         console.log('📧 Sending personal loan emails')
        
//         await sendEmail({
//           to: userEmail,
//           subject: `${loanData.loanType} Application Received - BPH Growth`,
//           html: personalLoanUserTemplate({
//             fullName: loanData.fullName,
//             loanAmount: loanData.loanAmount
//           })
//         })

//         await sendEmail({
//           to: process.env.BUSINESS_EMAIL,
//           subject: `New ${loanData.loanType} Application - ${loanData.fullName}`,
//           html: personalLoanAdminTemplate({
//             fullName: loanData.fullName,
//             email: userEmail,
//             loanAmount: loanData.loanAmount,
//             purposeOfLoan: loanData.purposeOfLoan || 'Not specified'
//           })
//         })
//       } else {
//         // BUSINESS LOAN EMAILS
//         console.log('📧 Sending business loan emails')
        
//         await sendEmail({
//           to: userEmail,
//           subject: `${loanData.loanType} Application Received - BPH Growth`,
//           html: businessLoanUserTemplate({
//             fullName: loanData.fullName,
//             businessName: loanData.businessName,
//             loanAmount: loanData.loanAmount
//           })
//         })

//         await sendEmail({
//           to: process.env.BUSINESS_EMAIL,
//           subject: `New ${loanData.loanType} Application - ${loanData.businessName}`,
//           html: businessLoanAdminTemplate({
//             fullName: loanData.fullName,
//             businessEmail: userEmail,
//             businessName: loanData.businessName,
//             loanAmount: loanData.loanAmount,
//             businessPurpose: loanData.businessPurpose || 'Not specified'
//           })
//         })
//       }

//       console.log('✅ Confirmation emails sent successfully')
//     } catch (emailError) {
//       console.error('⚠️ Email sending failed:', emailError.message)
//     }

//     res.status(201).json({
//       success: true,
//       message: 'Loan application submitted successfully',
//       data: loan
//     })
//   } catch (error) {
//     console.error('❌ Error submitting loan:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to submit loan application',
//       error: error.message
//     })
//   }
// }

// // Get all loan applications (Admin)
// export const getAllLoans = async (req, res) => {
//   try {
//     const { status, loanType, page = 1, limit = 10 } = req.query

//     const where = {}
//     if (status) where.status = status
//     if (loanType) where.loanType = loanType

//     const skip = (page - 1) * limit

//     const [loans, total] = await Promise.all([
//       prisma.loanApplication.findMany({
//         where,
//         skip: parseInt(skip),
//         take: parseInt(limit),
//         orderBy: { submittedAt: 'desc' }
//       }),
//       prisma.loanApplication.count({ where })
//     ])

//     res.status(200).json({
//       success: true,
//       data: loans,
//       pagination: {
//         total,
//         page: parseInt(page),
//         limit: parseInt(limit),
//         totalPages: Math.ceil(total / limit)
//       }
//     })
//   } catch (error) {
//     console.error('Error fetching loans:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch loan applications',
//       error: error.message
//     })
//   }
// }

// // Get single loan application (Admin)
// export const getLoanById = async (req, res) => {
//   try {
//     const { id } = req.params

//     const loan = await prisma.loanApplication.findUnique({
//       where: { id }
//     })

//     if (!loan) {
//       return res.status(404).json({
//         success: false,
//         message: 'Loan application not found'
//       })
//     }

//     res.status(200).json({
//       success: true,
//       data: loan
//     })
//   } catch (error) {
//     console.error('Error fetching loan:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch loan application',
//       error: error.message
//     })
//   }
// }

// // Approve loan (Admin)
// export const approveLoan = async (req, res) => {
//   try {
//     const { id } = req.params

//     const loan = await prisma.loanApplication.update({
//       where: { id },
//       data: { status: 'approved' }
//     })

//     console.log('✅ Loan approved:', loan.id)

//     // Extract email and loan type
//     const userEmail = loan.businessEmail || loan.email
//     const loanType = loan.loanType

//     console.log('📧 Sending approval email, isPersonal:', isPersonalLoan(loanType))

//     // Send approval email based on loan type
//     try {
//       if (isPersonalLoan(loanType)) {
//         // PERSONAL LOAN APPROVAL
//         await sendEmail({
//           to: userEmail,
//           subject: `${loan.loanType} Application Approved - BPH Growth`,
//           html: personalLoanApprovalTemplate({
//             fullName: loan.fullName,
//             loanAmount: loan.loanAmount
//           })
//         })
//       } else {
//         // BUSINESS LOAN APPROVAL
//         await sendEmail({
//           to: userEmail,
//           subject: `${loan.loanType} Application Approved - BPH Growth`,
//           html: businessLoanApprovalTemplate({
//             fullName: loan.fullName,
//             businessName: loan.businessName,
//             loanAmount: loan.loanAmount
//           })
//         })
//       }

//       console.log('✅ Approval email sent to:', userEmail)
//     } catch (emailError) {
//       console.error('⚠️ Approval email failed:', emailError.message)
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Loan approved successfully',
//       data: loan
//     })
//   } catch (error) {
//     console.error('Error approving loan:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to approve loan',
//       error: error.message
//     })
//   }
// }

// // Deny loan (Admin)
// export const denyLoan = async (req, res) => {
//   try {
//     const { id } = req.params

//     const loan = await prisma.loanApplication.update({
//       where: { id },
//       data: { status: 'denied' }
//     })

//     console.log('❌ Loan denied:', loan.id)

//     // Extract email and loan type
//     const userEmail = loan.businessEmail || loan.email
//     const loanType = loan.loanType

//     console.log('📧 Sending denial email, isPersonal:', isPersonalLoan(loanType))

//     // Send denial email based on loan type
//     try {
//       if (isPersonalLoan(loanType)) {
//         // PERSONAL LOAN DENIAL
//         await sendEmail({
//           to: userEmail,
//           subject: `${loan.loanType} Application Update - BPH Growth`,
//           html: personalLoanDenialTemplate({
//             fullName: loan.fullName
//           })
//         })
//       } else {
//         // BUSINESS LOAN DENIAL
//         await sendEmail({
//           to: userEmail,
//           subject: `${loan.loanType} Application Update - BPH Growth`,
//           html: businessLoanDenialTemplate({
//             fullName: loan.fullName,
//             businessName: loan.businessName
//           })
//         })
//       }

//       console.log('✅ Denial email sent to:', userEmail)
//     } catch (emailError) {
//       console.error('⚠️ Denial email failed:', emailError.message)
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Loan denied',
//       data: loan
//     })
//   } catch (error) {
//     console.error('Error denying loan:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to deny loan',
//       error: error.message
//     })
//   }
// }

// // Delete loan application (Admin)
// export const deleteLoan = async (req, res) => {
//   try {
//     const { id } = req.params

//     await prisma.loanApplication.delete({
//       where: { id }
//     })

//     res.status(200).json({
//       success: true,
//       message: 'Loan application deleted successfully'
//     })
//   } catch (error) {
//     console.error('Error deleting loan:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete loan application',
//       error: error.message
//     })
//   }
// }


import { prisma } from '../config/database.js'
import { sendCustomerEmail, sendAdminEmail } from '../config/email.js'
import {
  personalLoanUserTemplate,
  personalLoanAdminTemplate,
  personalLoanApprovalTemplate,
  personalLoanDenialTemplate,
  businessLoanUserTemplate,
  businessLoanAdminTemplate,
  businessLoanApprovalTemplate,
  businessLoanDenialTemplate
} from '../utils/emailTemplates.js'

// Helper function to determine if it's a personal loan (case-insensitive)
const isPersonalLoan = (loanType) => {
  if (!loanType) return false
  
  const normalizedType = loanType.toLowerCase().trim()
  
  // Check if it contains "personal" (covers "Personal Loans", "Personal Loan", "Personal Asset Financing")
  if (normalizedType.includes('personal')) {
    return true
  }
  
  return false
}

// Submit loan application
export const submitLoan = async (req, res) => {
  try {
    const loanData = req.body

    // Extract email - handle both 'email' and 'businessEmail' field names
    const userEmail = loanData.businessEmail || loanData.email
    const loanType = loanData.loanType

    console.log('🔥 Loan submission:', { 
      fullName: loanData.fullName, 
      email: userEmail,
      loanType: loanType,
      isPersonal: isPersonalLoan(loanType)
    })

    // Save to database
    const loan = await prisma.loanApplication.create({
      data: loanData
    })

    console.log('✅ Loan created:', loan.id)

    // Send confirmation emails based on loan type
    try {
      if (isPersonalLoan(loanType)) {
        // PERSONAL LOAN EMAILS
        console.log('📧 Sending personal loan emails')
        
        // 1. Send confirmation to CUSTOMER
        // FROM: noreply@bphgrowth.com
        // REPLY-TO: support@bphgrowth.com
        await sendCustomerEmail({
          to: userEmail,
          subject: `${loanData.loanType} Application Received - BPH Growth`,
          html: personalLoanUserTemplate({
            fullName: loanData.fullName,
            loanAmount: loanData.loanAmount
          })
        })

        // 2. Send alert to ADMIN
        // FROM: noreply@bphgrowth.com
        // TO: support@bphgrowth.com
        await sendAdminEmail({
          to: process.env.EMAIL_ADMIN || 'support@bphgrowth.com',
          subject: `🔔 New ${loanData.loanType} Application - ${loanData.fullName}`,
          html: personalLoanAdminTemplate({
            fullName: loanData.fullName,
            email: userEmail,
            loanAmount: loanData.loanAmount,
            purposeOfLoan: loanData.purposeOfLoan || 'Not specified'
          })
        })
      } else {
        // BUSINESS LOAN EMAILS
        console.log('📧 Sending business loan emails')
        
        // 1. Send confirmation to CUSTOMER
        // FROM: noreply@bphgrowth.com
        // REPLY-TO: support@bphgrowth.com
        await sendCustomerEmail({
          to: userEmail,
          subject: `${loanData.loanType} Application Received - BPH Growth`,
          html: businessLoanUserTemplate({
            fullName: loanData.fullName,
            businessName: loanData.businessName,
            loanAmount: loanData.loanAmount
          })
        })

        // 2. Send alert to ADMIN
        // FROM: noreply@bphgrowth.com
        // TO: support@bphgrowth.com
        await sendAdminEmail({
          to: process.env.EMAIL_ADMIN || 'support@bphgrowth.com',
          subject: `🔔 New ${loanData.loanType} Application - ${loanData.businessName}`,
          html: businessLoanAdminTemplate({
            fullName: loanData.fullName,
            businessEmail: userEmail,
            businessName: loanData.businessName,
            loanAmount: loanData.loanAmount,
            businessPurpose: loanData.businessPurpose || 'Not specified'
          })
        })
      }

      console.log('✅ Confirmation emails sent successfully')
    } catch (emailError) {
      console.error('⚠️ Email sending failed:', emailError.message)
    }

    res.status(201).json({
      success: true,
      message: 'Loan application submitted successfully',
      data: loan
    })
  } catch (error) {
    console.error('❌ Error submitting loan:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit loan application',
      error: error.message
    })
  }
}

// Get all loan applications (Admin)
export const getAllLoans = async (req, res) => {
  try {
    const { status, loanType, page = 1, limit = 10 } = req.query

    const where = {}
    if (status) where.status = status
    if (loanType) where.loanType = loanType

    const skip = (page - 1) * limit

    const [loans, total] = await Promise.all([
      prisma.loanApplication.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { submittedAt: 'desc' }
      }),
      prisma.loanApplication.count({ where })
    ])

    res.status(200).json({
      success: true,
      data: loans,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching loans:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch loan applications',
      error: error.message
    })
  }
}

// Get single loan application (Admin)
export const getLoanById = async (req, res) => {
  try {
    const { id } = req.params

    const loan = await prisma.loanApplication.findUnique({
      where: { id }
    })

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: 'Loan application not found'
      })
    }

    res.status(200).json({
      success: true,
      data: loan
    })
  } catch (error) {
    console.error('Error fetching loan:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch loan application',
      error: error.message
    })
  }
}

// Approve loan (Admin)
export const approveLoan = async (req, res) => {
  try {
    const { id } = req.params

    const loan = await prisma.loanApplication.update({
      where: { id },
      data: { status: 'approved' }
    })

    console.log('✅ Loan approved:', loan.id)

    // Extract email and loan type
    const userEmail = loan.businessEmail || loan.email
    const loanType = loan.loanType

    console.log('📧 Sending approval email, isPersonal:', isPersonalLoan(loanType))

    // Send approval email to CUSTOMER based on loan type
    // FROM: noreply@bphgrowth.com
    // REPLY-TO: support@bphgrowth.com
    try {
      if (isPersonalLoan(loanType)) {
        // PERSONAL LOAN APPROVAL
        await sendCustomerEmail({
          to: userEmail,
          subject: `${loan.loanType} Application Approved - BPH Growth`,
          html: personalLoanApprovalTemplate({
            fullName: loan.fullName,
            loanAmount: loan.loanAmount
          })
        })
      } else {
        // BUSINESS LOAN APPROVAL
        await sendCustomerEmail({
          to: userEmail,
          subject: `${loan.loanType} Application Approved - BPH Growth`,
          html: businessLoanApprovalTemplate({
            fullName: loan.fullName,
            businessName: loan.businessName,
            loanAmount: loan.loanAmount
          })
        })
      }

      console.log('✅ Approval email sent to:', userEmail)
    } catch (emailError) {
      console.error('⚠️ Approval email failed:', emailError.message)
    }

    res.status(200).json({
      success: true,
      message: 'Loan approved successfully',
      data: loan
    })
  } catch (error) {
    console.error('Error approving loan:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to approve loan',
      error: error.message
    })
  }
}

// Deny loan (Admin)
export const denyLoan = async (req, res) => {
  try {
    const { id } = req.params

    const loan = await prisma.loanApplication.update({
      where: { id },
      data: { status: 'denied' }
    })

    console.log('❌ Loan denied:', loan.id)

    // Extract email and loan type
    const userEmail = loan.businessEmail || loan.email
    const loanType = loan.loanType

    console.log('📧 Sending denial email, isPersonal:', isPersonalLoan(loanType))

    // Send denial email to CUSTOMER based on loan type
    // FROM: noreply@bphgrowth.com
    // REPLY-TO: support@bphgrowth.com
    try {
      if (isPersonalLoan(loanType)) {
        // PERSONAL LOAN DENIAL
        await sendCustomerEmail({
          to: userEmail,
          subject: `${loan.loanType} Application Update - BPH Growth`,
          html: personalLoanDenialTemplate({
            fullName: loan.fullName
          })
        })
      } else {
        // BUSINESS LOAN DENIAL
        await sendCustomerEmail({
          to: userEmail,
          subject: `${loan.loanType} Application Update - BPH Growth`,
          html: businessLoanDenialTemplate({
            fullName: loan.fullName,
            businessName: loan.businessName
          })
        })
      }

      console.log('✅ Denial email sent to:', userEmail)
    } catch (emailError) {
      console.error('⚠️ Denial email failed:', emailError.message)
    }

    res.status(200).json({
      success: true,
      message: 'Loan denied',
      data: loan
    })
  } catch (error) {
    console.error('Error denying loan:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to deny loan',
      error: error.message
    })
  }
}

// Delete loan application (Admin)
export const deleteLoan = async (req, res) => {
  try {
    const { id } = req.params

    await prisma.loanApplication.delete({
      where: { id }
    })

    res.status(200).json({
      success: true,
      message: 'Loan application deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting loan:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete loan application',
      error: error.message
    })
  }
}