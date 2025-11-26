function LoanServices() {
  const loanTypes = [
    {
      title: "Personal Loans",
      subtitle: "For: Bills, education, weddings, home repairs",
      description: "Life doesn't wait, and neither should you. Our personal loans give you the financial freedom to handle life's ups and downs with confidence.",
      types: [
        "Emergency Loan",
        "Student Loan",
        "Debt Consolidation"
      ],
      amount: "₦50,000 - ₦5,000,000",
      tenure: "1 - 12 months",
      interestRate: "From 3% per month",
      processingTime: "24 hours",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80",
      imagePosition: "left"
    },
    {
      title: "Business Loans",
      subtitle: "For: Inventory, equipment, expansion, working capital",
      description: "Don't let cash flow hold back your business dreams. Our business loans give you the capital you need to expand, stock up, hire, and grow.",
      types: [
        "Micro Business Loan",
        "SME Growth Loan",
        "Enterprise Expansion Loan"
      ],
      amount: "₦50,000 - ₦1,000,000",
      tenure: "1 - 6 months",
      interestRate: "From 4% per month",
      processingTime: "2 hours",
      image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&q=80",
      imagePosition: "right"
    },
    {
      title: "Asset Financing Loans",
      subtitle: "For: Vehicles, machinery & equipment, land, electronics, etc.",
      description: "Don't let cash flow hold back your business dreams. Our business loans give you the capital you need to expand, stock up, hire, and grow.",
      types: [
        "Gadgets & Electronics Financing Loans",
        "Real Estate Financing Loan",
        "Vehicle Financing Loan"
      ],
      amount: "₦50,000 - ₦5,000,000",
      tenure: "1 - 12 months",
      interestRate: "From 3% per month",
      processingTime: "24 hours",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
      imagePosition: "left"
    }
  ]

  const scrollToForm = () => {
    const formSection = document.getElementById('loan-application-form')
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="py-12 lg:py-16 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-2 lg:mb-3">Our Services</h2>
          <p className="text-gray-600 text-base lg:text-lg">
            Find the perfect loan solution that matches your needs and goals
          </p>
        </div>

        {/* Loan Types */}
        <div className="space-y-12 lg:space-y-16">
          {loanTypes.map((loan, index) => (
            <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center`}>
              {loan.imagePosition === "left" ? (
                <>
                  {/* Image Left on Desktop, Always on Top on Mobile */}
                  <div className="relative h-full min-h-[300px] lg:min-h-[400px] order-2 lg:order-1">
                    <div 
                      className="absolute inset-0 rounded-2xl bg-cover bg-center flex flex-col justify-end p-6 lg:p-8 text-white"
                      style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${loan.image})`
                      }}
                    >
                      <div className="space-y-1.5 lg:space-y-2 text-xs lg:text-sm">
                        <p><span className="font-semibold">Amount:</span> {loan.amount}</p>
                        <p><span className="font-semibold">Tenure:</span> {loan.tenure}</p>
                        <p><span className="font-semibold">Interest Rate:</span> {loan.interestRate}</p>
                        <p><span className="font-semibold">Processing Time:</span> {loan.processingTime}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content Right on Desktop, On Top on Mobile */}
                  <div className="order-1 lg:order-2">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-2">{loan.title}</h3>
                    <p className="text-gray-600 text-xs lg:text-sm mb-3 lg:mb-4">{loan.subtitle}</p>
                    <p className="text-sm lg:text-base text-gray-700 mb-4 lg:mb-6 leading-relaxed">{loan.description}</p>
                    
                    <div className="space-y-1.5 lg:space-y-2 mb-4 lg:mb-6">
                      {loan.types.map((type, idx) => (
                        <p key={idx} className="text-sm lg:text-base text-gray-700">{type}</p>
                      ))}
                    </div>

                    <button 
                      onClick={scrollToForm}
                      className="bg-[#60a5fa] text-white px-6 py-2 lg:px-8 lg:py-2 text-sm lg:text-base rounded-full hover:bg-[#3b82f6] transition-colors"
                    >
                      Apply Now
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Content Left on Desktop, Always on Top on Mobile */}
                  <div className="order-1">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-2">{loan.title}</h3>
                    <p className="text-gray-600 text-xs lg:text-sm mb-3 lg:mb-4">{loan.subtitle}</p>
                    <p className="text-sm lg:text-base text-gray-700 mb-4 lg:mb-6 leading-relaxed">{loan.description}</p>
                    
                    <div className="space-y-1.5 lg:space-y-2 mb-4 lg:mb-6">
                      {loan.types.map((type, idx) => (
                        <p key={idx} className="text-sm lg:text-base text-gray-700">{type}</p>
                      ))}
                    </div>

                    <button 
                      onClick={scrollToForm}
                      className="bg-[#60a5fa] text-white px-6 py-2 lg:px-8 lg:py-2 text-sm lg:text-base rounded-full hover:bg-[#3b82f6] transition-colors"
                    >
                      Apply Now
                    </button>
                  </div>

                  {/* Image Right on Desktop, Below Content on Mobile */}
                  <div className="relative h-full min-h-[300px] lg:min-h-[400px] order-2">
                    <div 
                      className="absolute inset-0 rounded-2xl bg-cover bg-center flex flex-col justify-end p-6 lg:p-8 text-white"
                      style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${loan.image})`
                      }}
                    >
                      <div className="space-y-1.5 lg:space-y-2 text-xs lg:text-sm">
                        <p><span className="font-semibold">Amount:</span> {loan.amount}</p>
                        <p><span className="font-semibold">Tenure:</span> {loan.tenure}</p>
                        <p><span className="font-semibold">Interest Rate:</span> {loan.interestRate}</p>
                        <p><span className="font-semibold">Processing Time:</span> {loan.processingTime}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LoanServices