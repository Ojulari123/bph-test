import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HowWeWork from '../components/HowWeWork'
import BankablePlanForm from '../components/BankablePlanForm'

function Services() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    })
  }, [])

  // Add this new useEffect for scrolling to anchor
  useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash
    if (hash) {
      // Small delay to ensure page is fully loaded
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [])

  return (
    <div className="bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#1a2332] px-8 py-16 lg:py-40 rounded-b-[40px]">
        <div className="max-w-5xl mx-auto text-center">
          <h1 
            className="text-3xl lg:text-5xl font-bold mb-6 text-white"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Comprehensive Business Solutions for Every Stage of Your Journey
          </h1>

          <p 
            className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            From ideation to scaling, we provide the strategic guidance, tools, and support you need to build a thriving business in Nigeria's dynamic market.
          </p>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-12">Our Services</h2>

          <div className="space-y-12 lg:space-y-16">
            {/* Strategic Planning & Execution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">Strategic Planning & Execution</h3>
                <p className="text-sm lg:text-base text-gray-700 mb-4 lg:mb-6">
                  We are experts in defining the necessary processes and operational frameworks to achieve your envisioned future.
                </p>
                <ul className="space-y-2 text-gray-700 text-xs lg:text-sm">
                  <li>• Market Research, Opportunity Analysis, and Risk Assessment.</li>
                  <li>• Developing Business Models, Bankable Business Plans, and Investor Pitch Decks.</li>
                  <li>• Financial Modelling, Projections, and Business Valuation (Incl. Future Prediction Feature).</li>
                  <li>• Operational Process Development, Improvement Strategies, and Resource Optimization.</li>
                  <li>• Sales & Marketing Strategy: Developing digital and unconventional strategies for high turnover.</li>
                </ul>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80"
                  alt="Strategic Planning"
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>
            </div>

            {/* Funding & Capital Access */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80"
                  alt="Funding & Capital Access"
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">Funding & Capital Access</h3>
                <p className="text-sm lg:text-base text-gray-700 mb-4 lg:mb-6">
                  We analyze your venture's needs and connect you with the right type of capital to scale.
                </p>
                <ul className="space-y-2 text-gray-700 text-xs lg:text-sm">
                  <li>• Access to Funds: Consultancy and arrangement for Angel Funding, Commercial Loans, Government Loans, and Equity Financing.</li>
                  <li>• Grant Writing and Proposal Development Support.</li>
                  <li>• Investor Readiness and Due Diligence Preparation.</li>
                  <li>• Business Performance Appraisal and Business Intelligence for Data-Driven Funding Decisions.</li>
                </ul>
              </div>
            </div>

            {/* AI Consulting & Digital Transformation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">AI Consulting & Digital Transformation</h3>
                <p className="text-sm lg:text-base text-gray-700 mb-4 lg:mb-6">
                  Future-proof your business by integrating artificial intelligence and digital tools for efficiency and competitive edge.
                </p>
                <ul className="space-y-2 text-gray-700 text-xs lg:text-sm">
                  <li>• AI Bot Development and Implementation for customer service or lead qualification.</li>
                  <li>• AI Training & Education for teams and C-level executives.</li>
                  <li>• Digital Transformation Roadmap and Custom AI Solutions.</li>
                  <li>• Online Courses: Corporate & Business Strategy, Macroeconomic (PESTEL), Industry (Porter's 5 Forces), Company (SWOT) Research Analysis.</li>
                </ul>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80"
                  alt="AI Consulting"
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>
            </div>

            {/* Business Clinic & Leadership Development */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80"
                  alt="Business Clinic"
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">Business Clinic & Leadership Development</h3>
                <p className="text-sm lg:text-base text-gray-700 mb-4 lg:mb-6">
                  Success starts with the founder. We focus on the mindset required for long-term entrepreneurial success.
                </p>
                <ul className="space-y-2 text-gray-700 text-xs lg:text-sm">
                  <li>• Cognitive Reprogramming: Visualization, Affirmations, and Mentoring classes for business owners.</li>
                  <li>• Bespoke Training in Leadership, Marketing, Finance, CRM, and Negotiation Skills for your staff.</li>
                  <li>• Executive Coaching for C-level leaders and aspiring entrepreneurs.</li>
                  <li>• Access to our exclusive network of mentors and industry veterans.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HowWeWork />
      <BankablePlanForm />
      
      {/* CTA Section */}
      <section className="py-12 lg:py-20 px-8 bg-white border-t-2 border-b-2 border-[#1a2332]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl lg:text-5xl font-bold mb-2 lg:mb-6 text-[#1a2332]">
            Do You Have Questions?
          </h2>

          <p className="text-base lg:text-xl text-gray-700 mb-6 lg:mb-8">
            Anything Unclear?
          </p>

          <a href="/faqs">
            <button className="bg-[#1a2332] text-white px-6 py-3 lg:px-10 lg:py-4 rounded-full text-base lg:text-lg font-semibold hover:bg-[#2a3f52] transition-colors transform hover:scale-105">
              View FAQs
            </button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Services