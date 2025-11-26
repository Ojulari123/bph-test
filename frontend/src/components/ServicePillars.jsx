import { useState } from 'react'

function ServicePillars() {
  const [expandedCard, setExpandedCard] = useState(0)

  const services = [
    {
      title: "Strategic Planning & Business Consulting",
      description: "Transform your vision into a bankable business plan with our expert strategic planning and consulting services.",
      points: [
        "Market Research, Opportunity Analysis, and Risk Assessment",
        "Bankable Business Plans and Investor Pitch Decks",
        "Financial Modeling, Projections, and Business Valuation",
        "Operational Process Development and Improvement Strategies",
        "Sales & Marketing Strategy for High Growth and Revenue"
      ],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
    },
    {
      title: "AI Consulting & Digital Transformation",
      description: "Future-proof your business by integrating AI and digital tools for efficiency and competitive advantage.",
      points: [
        "AI Strategy Consulting and Implementation",
        "Digital Transformation Roadmap Development",
        "AI Bot Development for Customer Service and Lead Generation",
        "AI Training & Education for Teams and Executives",
        "Custom AI Solutions for Operational Excellence"
      ],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
    },
    {
      title: "Personal,Business & Asset Financing Loans",
      description: "Fast, flexible loan solutions to help you achieve your personal goals and grow your business without delays.",
      points: [
        "Personal Loans: Bills, Education, Weddings, Home Repairs",
        "Business Loans: Inventory, Equipment, Expansion, Working Capital",
        "Loan Amounts: ₦50,000 - ₦5,000,000",
        "Asset Financing: Vehicles, Machinery, Real Estate, Electronics",
        "Flexible Tenure: 1-12 Months Repayment Options"
      ],
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80"
    },
    {
      title: "Capital Access",
      description: "We connect with investors and donors to scale your business sustainably.",
      points: [
        "Equity Financing: Angel Investment and Venture Capital",
        "Grant Writing and Proposal Development Support",
        "Investor Readiness and Due Diligence Preparation",
        "Flexible Financing Options Tailored to Your Needs"
      ],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
    }
  ]

  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-12">
          Our Comprehensive Service Pillars
        </h2>

        {/* Desktop View - Expanding Cards */}
        <div className="hidden lg:flex gap-4 h-[500px]">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out ${
                expandedCard === index ? 'flex-2' : 'flex-[0.5]'
              }`}
              onMouseEnter={() => setExpandedCard(index)}
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${service.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

              <div className="relative p-8 flex flex-col justify-end h-full text-white">
                {expandedCard === index ? (
                  <div className="space-y-4 opacity-0 animate-[fadeIn_0.5s_ease-in_0.3s_forwards]">
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                    <p className="text-sm leading-relaxed">{service.description}</p>
                    <ul className="space-y-2 text-sm">
                      {service.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#60a5fa] mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <h3 className="text-xl font-bold text-center [writing-mode:vertical-lr] rotate-180">
                      {service.title}
                    </h3>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View - Stacked Cards */}
        <div className="lg:hidden space-y-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden h-[400px]"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${service.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />

              <div className="relative p-6 flex flex-col justify-end h-full text-white">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="text-sm leading-relaxed">{service.description}</p>
                  <ul className="space-y-2 text-xs">
                    {service.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#60a5fa] mt-0.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicePillars