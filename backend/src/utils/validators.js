import { z } from 'zod'

export const consultationSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  businessEmail: z.string().email('Invalid email address'),
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  industrySector: z.string().min(1, 'Industry sector is required'),
  currentBusinessStage: z.string().min(1, 'Business stage is required'),
  primaryServiceInterest: z.string().min(1, 'Service interest is required'),
  targetFundingAmount: z.string().optional().nullable(),
  businessSummary: z.string().min(10, 'Business summary must be at least 10 characters'),
  slotId: z.string().min(1, 'Time slot is required') // Changed from scheduledDate
})

export const loanSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters'),
  loanType: z.string().min(1, 'Loan type is required'),
  loanAmount: z.string().min(1, 'Loan amount is required'),
  repaymentPeriod: z.string().min(1, 'Repayment period is required'),
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

export const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const resourceRequestSchema = z.object({
  email: z.string().email('Invalid email address'),
  resourceId: z.string().min(1, 'Resource ID is required'),
  resourceTitle: z.string().min(1, 'Resource title is required'),
})