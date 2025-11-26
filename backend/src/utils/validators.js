// import { z } from 'zod'

// export const consultationSchema = z.object({
//   fullName: z.string().min(2, 'Full name must be at least 2 characters'),
//   businessEmail: z.string().email('Invalid email address'),
//   companyName: z.string().min(2, 'Company name must be at least 2 characters'),
//   industrySector: z.string().min(1, 'Industry sector is required'),
//   currentBusinessStage: z.string().min(1, 'Business stage is required'),
//   primaryServiceInterest: z.string().min(1, 'Service interest is required'),
//   targetFundingAmount: z.string().optional().nullable(),
//   businessSummary: z.string().min(10, 'Business summary must be at least 10 characters'),
//   slotId: z.string().min(1, 'Time slot is required') // Changed from scheduledDate
// })

// export const loanSchema = z.object({
//   fullName: z.string().min(2, 'Full name must be at least 2 characters'),
//   email: z.string().email('Invalid email address'),
//   phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters'),
//   loanType: z.string().min(1, 'Loan type is required'),
//   loanAmount: z.string().min(1, 'Loan amount is required'),
//   repaymentPeriod: z.string().min(1, 'Repayment period is required'),
//   employmentStatus: z.string().optional(),
//   monthlyIncome: z.string().optional(),
//   loanPurpose: z.string().optional(),
//   businessName: z.string().optional(),
//   businessRegistration: z.string().optional(),
//   yearEstablished: z.string().optional(),
//   monthlyRevenue: z.string().optional(),
//   businessPurpose: z.string().optional(),
//   assetType: z.string().optional(),
//   assetValue: z.string().optional(),
//   assetDescription: z.string().optional(),
// })

// export const loginSchema = z.object({
//   username: z.string().min(3, 'Username must be at least 3 characters'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
// })

// export const resourceRequestSchema = z.object({
//   email: z.string().email('Invalid email address'),
//   resourceId: z.string().min(1, 'Resource ID is required'),
//   resourceTitle: z.string().min(1, 'Resource title is required'),
// })

import { z } from 'zod'

/* ----------------------- ID VALIDATION ----------------------- */
export const idParamSchema = z.object({
  id: z.string().uuid("Invalid ID format"),
})

/* ----------------------- CONSULTATION FORM ----------------------- */
export const consultationSchema = z.object({
  fullName: z.string().min(2),
  businessEmail: z.string().email(),
  companyName: z.string().min(2),
  industrySector: z.string().min(1),
  currentBusinessStage: z.string().min(1),
  primaryServiceInterest: z.string().min(1),
  targetFundingAmount: z.string().optional().nullable(),
  businessSummary: z.string().min(10),
  slotId: z.string().min(1),
})

/* ----------------------- LOAN FORM ----------------------- */
export const loanSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phoneNumber: z.string().min(10),
  loanType: z.string().min(1),
  loanAmount: z.string().min(1),
  repaymentPeriod: z.string().min(1),
  employmentStatus: z.string().optional(),
  monthlyIncome: z.string().optional(),
  loanPurpose: z.string().optional(),
  businessName: z.string().optional(),
  businessRegistration: z.string().optional(),
  yearEstablished: z.string().optional(),
  monthlyRevenue: z.string().optional(),
  businessPurpose: z.string().optional(),
  assetType: z.string().optional(),
  assetValue: z.string().optional(),
  assetDescription: z.string().optional(),
})

/* ----------------------- LOGIN ----------------------- */
export const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
})

/* ----------------------- RESOURCE DOWNLOAD ----------------------- */
export const resourceRequestSchema = z.object({
  email: z.string().email(),
  resourceId: z.string().min(1),
  resourceTitle: z.string().min(1),
})

/* ----------------------- FAQ VALIDATION ----------------------- */
export const faqSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 chars"),
  answer: z.string().min(5, "Answer must be at least 5 chars"),
})

/* ----------------------- INSIGHT VALIDATION ----------------------- */
export const insightSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string().min(2),
})

/* ----------------------- RESOURCE CREATION ----------------------- */
export const resourceSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string().min(2),
})

/* ----------------------- SLOT CREATION ----------------------- */
export const slotSchema = z.object({
  date: z.string().refine(v => !Number.isNaN(Date.parse(v)), "Invalid date"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Time must be HH:MM"),
})

export const multipleSlotsSchema = z.array(slotSchema)
