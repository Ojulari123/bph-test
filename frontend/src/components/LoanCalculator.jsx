import { useState } from 'react'
import Select from 'react-select'

function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(250000)
  const [loanType, setLoanType] = useState({ value: 'personal', label: 'Personal Loan' })
  const [repaymentPeriod, setRepaymentPeriod] = useState(6)

  // Detect if device is mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024

  const loanTypeOptions = [
    { value: 'personal', label: 'Personal Loan' },
    { value: 'business', label: 'Business Loans' },
    { value: 'personal-asset', label: 'Personal Asset Loan' },
    { value: 'business-asset', label: 'Business Asset Loan' }
  ]

  // Interest rates based on loan type (monthly)
  const interestRates = {
    'personal': 0.03, // 3% per month
    'business': 0.04, // 4% per month
    'personal-asset': 0.03,
    'business-asset': 0.035
  }

  // Calculate loan details
  const calculateLoan = () => {
    const monthlyInterestRate = interestRates[loanType.value]
    const totalInterest = loanAmount * monthlyInterestRate * repaymentPeriod
    const processingFee = loanAmount * 0.02 // 2% processing fee
    const totalRepayment = loanAmount + totalInterest + processingFee
    const monthlyPayment = totalRepayment / repaymentPeriod

    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      processingFee: processingFee.toFixed(2),
      totalRepayment: totalRepayment.toFixed(2)
    }
  }

  const breakdown = calculateLoan()

  // Custom styles for react-select
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      border: '1px solid #d1d5db',
      borderRadius: '1.5rem',
      padding: '0.5rem 1rem',
      boxShadow: 'none',
      borderColor: state.isFocused ? '#9ca3af' : '#d1d5db',
      '&:hover': {
        borderColor: '#9ca3af'
      }
    }),
    placeholder: (base) => ({
      ...base,
      color: '#000000',
      fontSize: '1.125rem'
    }),
    singleValue: (base) => ({
      ...base,
      color: '#000000',
      fontSize: '1.125rem'
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '0.5rem',
      overflow: 'hidden',
      border: '1px solid #d1d5db'
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
      borderRadius: '0.5rem'
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? '#f3f4f6'
        : state.isFocused
        ? '#f3f4f6'
        : 'white',
      color: 'black',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#f3f4f6'
      }
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#6b7280',
      '&:hover': {
        color: '#6b7280'
      }
    }),
    indicatorSeparator: () => ({
      display: 'none'
    })
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value).replace('NGN', '₦')
  }

  return (
    <section className="py-12 lg:py-16 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold mb-2 lg:mb-3">Loan Calculator</h2>
        <p className="text-gray-600 text-base lg:text-lg mb-8 lg:mb-12">Find out exactly how much you'll pay each month</p>

        <div className="border-2 border-gray-300 rounded-3xl p-6 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left Side - Calculator Inputs */}
            <div className="space-y-6 lg:space-y-8">
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between items-center mb-3 lg:mb-4">
                  <h3 className="text-l lg:text-2xl font-bold">Loan Amount</h3>
                  <span className="text-l lg:text-2xl font-bold">{formatCurrency(loanAmount)}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="5000000"
                  step="50000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Loan Type */}
              <div>
                <h3 className="text-l lg:text-2xl font-bold mb-3 lg:mb-4">Loan Type</h3>
                <Select
                  value={loanType}
                  onChange={setLoanType}
                  options={loanTypeOptions}
                  styles={customSelectStyles}
                  isSearchable={!isMobile}
                />
              </div>

              {/* Repayment Period */}
              <div>
                <div className="flex justify-between items-center mb-3 lg:mb-4">
                  <h3 className="text-l lg:text-2xl font-bold">Repayment Period</h3>
                  <span className="text-l lg:text-2xl font-bold">{repaymentPeriod} months</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={repaymentPeriod}
                  onChange={(e) => setRepaymentPeriod(Number(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>

            {/* Right Side - Breakdown */}
            <div>
              <h3 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-3">Breakdown</h3>
              <p className="text-gray-600 text-sm lg:text-base mb-6 lg:mb-8">Based on the calculation:</p>

              <div className="space-y-4 lg:space-y-6">
                <div className="flex justify-between items-center py-2 lg:py-3 border-b border-gray-200">
                  <span className="text-base lg:text-lg">Monthly Payment:</span>
                  <span className="text-lg lg:text-xl font-semibold">{formatCurrency(breakdown.monthlyPayment)}</span>
                </div>

                <div className="flex justify-between items-center py-2 lg:py-3 border-b border-gray-200">
                  <span className="text-base lg:text-lg">Total Interest:</span>
                  <span className="text-lg lg:text-xl font-semibold">{formatCurrency(breakdown.totalInterest)}</span>
                </div>

                <div className="flex justify-between items-center py-2 lg:py-3 border-b border-gray-200">
                  <span className="text-base lg:text-lg">Processing fee:</span>
                  <span className="text-lg lg:text-xl font-semibold">{formatCurrency(breakdown.processingFee)}</span>
                </div>

                <div className="flex justify-between items-center py-2 lg:py-3">
                  <span className="text-base lg:text-lg font-bold">Total Repayment:</span>
                  <span className="text-lg lg:text-xl font-bold">{formatCurrency(breakdown.totalRepayment)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Slider Styling */}
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #60a5fa;
          cursor: pointer;
          border-radius: 50%;
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #60a5fa;
          cursor: pointer;
          border-radius: 50%;
          border: none;
        }
      `}</style>
    </section>
  )
}

export default LoanCalculator