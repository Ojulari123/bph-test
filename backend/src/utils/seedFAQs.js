import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const existingFAQs = [
  {
    question: "What services does BPH Growth offer?",
    answer: "We provide comprehensive business consulting including strategic planning, AI integration, business plan development, funding access (loans and equity financing), leadership development, and operational optimization tailored to your growth stage."
  },
  {
    question: "How long does it take to get a loan approved?",
    answer: "Our loan approval process is fast and efficient. Personal and business loans are typically processed within 2-24 hours, while asset financing may take 48-72 hours depending on documentation completeness."
  },
  {
    question: "What are the loan amount ranges available?",
    answer: "We offer flexible loan amounts ranging from ₦50,000 to ₦5,000,000 for personal loans, ₦50,000 to ₦1,000,000 for business loans, and up to ₦5,000,000 for asset financing, depending on your eligibility and requirements."
  },
  {
    question: "Do I need collateral to apply for a loan?",
    answer: "It depends on the loan type. Personal loans may require minimal collateral, while business loans typically need business documentation and guarantors. Asset financing loans are secured against the asset being financed."
  },
  {
    question: "How does the business consulting process work?",
    answer: "Our consulting process starts with an initial assessment (1-2 weeks), followed by strategic planning and implementation (3-6 months). We provide ongoing support, regular check-ins, and adjust strategies based on your progress and market changes."
  },
  {
    question: "What documents do I need to apply for a loan?",
    answer: "You'll need valid ID, BVN, proof of income, proof of residence, and bank statements. Business loans require additional documentation including business registration, tax ID, and business bank statements."
  },
  {
    question: "How does 'The Growth Blueprint' ensure my plan is executable?",
    answer: "We dedicate a phase to creating the Operational Execution Playbook—a high-value deliverable that provides specific system architecture, workflow designs, and process audits (Ops Diagnostics) necessary to implement the strategy without friction."
  },
  {
    question: "What is the 'AI Governance Roadmap'?",
    answer: "This consulting service goes beyond simply installing AI tools. We help you design the ethical, compliant, and data-secure frameworks necessary to integrate AI into your operations (as required by local and international standards)."
  },
  {
    question: "Is the Business Clinic mandatory for loans?",
    answer: "For high-risk products like Micro-Enterprise Trade Finance, a mandatory component of the Business Clinic Micro-Training is required before disbursement to ensure financial literacy and mitigate compliance risk."
  },
  {
    question: "How does BPH Growth Fund determine eligibility for loans?",
    answer: "We use a hybrid underwriting model. We look at standard factors (income verification) plus our proprietary data: 1. PlansDeck Data Scoring (for consulting clients), and 2. Cluster Risk Scoring (for Micro-Trade clients)."
  },
  {
    question: "What is 'Systemic Efficiency Coaching' in the Business Clinic?",
    answer: "It's the practical application of the mindset work. We combine visualization with tangible skill development in personal workflow optimization, digital system organization, and executive habit formation."
  },
  {
    question: "Can I hire the Consulting Arm without taking a loan?",
    answer: "Absolutely. The Consulting Services arm operates autonomously. You can hire us solely for strategy, operational execution, or training without any obligation to engage the Fund."
  },
  {
    question: "What is the typical timeline for 'The Growth Blueprint'?",
    answer: "The timeline typically ranges from 4 to 8 weeks, depending on the complexity of your business and the promptness of providing the required discovery materials."
  },
  {
    question: "When will the P2P Marketplace be available?",
    answer: "We are currently in the Pilot and Validation Phase of our lending products. We anticipate beginning the build-out and onboarding external retail investors for the P2P Debt Platform in the Mid-Term (Months 12-18)."
  },
  {
    question: "Can you help with equity financing and investor connections?",
    answer: "Yes! We provide access to angel investors and venture capital firms, help prepare investor-ready pitch decks and business plans, support due diligence processes, and guide you through negotiation strategies."
  },
  {
    question: "What makes BPH Growth different from other consultants?",
    answer: "We combine traditional business expertise with AI-augmented insights, offering data-driven strategies alongside personalized mentorship. Plus, we provide access to both consulting services and funding solutions in one place."
  },
  {
    question: "What is the interest rate on loans?",
    answer: "Our interest rates are competitive and vary by loan type. Personal loans start from 3% per month, business loans from 4% per month, and asset financing from 3% per month. Rates are customized based on loan amount, tenure, and risk assessment."
  },
  {
    question: "Do you work with startups or only established businesses?",
    answer: "We work with businesses at all stages—from early-stage startups seeking validation and funding to established companies looking to scale, pivot, or optimize their operations."
  },
  {
    question: "What is the loan repayment tenure?",
    answer: "We offer flexible repayment options ranging from 1 to 12 months depending on the loan type and amount. You can choose a tenure that aligns with your cash flow and financial planning."
  },
  {
    question: "How much does your consulting service cost?",
    answer: "Our consulting fees are customized based on your specific needs, business size, and engagement scope. We offer flexible packages and payment plans. Contact us at hello@bphgrowth.com for a personalized quote."
  },
  {
    question: "Can I get both consulting and financing services?",
    answer: "Absolutely! We offer integrated solutions where you can access strategic business consulting to build a bankable plan and then secure funding through our loan or equity financing options—all under one roof."
  },
  {
    question: "What are the eligibility criteria for loans?",
    answer: "You must be a Nigerian citizen aged 21-60 years, have a stable income or business revenue, possess valid identification and BVN, and provide required documentation. Business loans require additional business registration documents."
  },
  {
    question: "Do you provide AI consulting and digital transformation services?",
    answer: "Yes! We specialize in AI strategy consulting, AI bot development, digital transformation roadmaps, custom AI solutions, and provide training for teams and executives to leverage AI for competitive advantage."
  },
  {
    question: "How can I get started with BPH Growth?",
    answer: "Simply reach out to us via hello@bphgrowth.com, schedule a consultation through our website, or visit our office at 23 Durojaiye Street, Surulere, Lagos. We'll discuss your needs and recommend the best path forward."
  }
]

async function seedFAQs() {
  try {
    console.log('🌱 Starting FAQ seeding...')
    console.log('📊 Connecting to database...')

    // Check if FAQs already exist
    const existingCount = await prisma.fAQ.count()
    
    if (existingCount > 0) {
      console.log(`ℹ️  ${existingCount} FAQs already exist. Skipping seed.`)
      return
    }

    console.log('📝 Creating FAQs...')

    // Create all FAQs
    let created = 0
    for (const faq of existingFAQs) {
      await prisma.fAQ.create({
        data: {
          question: faq.question,
          answer: faq.answer,
          isActive: true
        }
      })
      created++
      process.stdout.write(`\r✓ Created ${created}/${existingFAQs.length} FAQs`)
    }

    console.log(`\n✅ Successfully seeded ${existingFAQs.length} FAQs!`)
  } catch (error) {
    console.error('❌ Error seeding FAQs:', error)
    throw error
  } finally {
    await prisma.$disconnect()
    console.log('📊 Database disconnected')
  }
}

// Run the seed function
seedFAQs()
  .then(() => {
    console.log('✅ Seeding complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  })