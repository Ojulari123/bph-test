import { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import api from '../config/api'

function FAQs() {
  const [showAll, setShowAll] = useState(false)
  const [openIndex, setOpenIndex] = useState(null)
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    })
    fetchFAQs()
  }, [])

  const fetchFAQs = async () => {
    try {
      const response = await api.get('/faqs')
      
      if (response.data.success) {
        // Get only active FAQs
        const activeFAQs = response.data.data.filter(faq => faq.isActive)
        setFaqs(activeFAQs)
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Show only first 6 FAQs by default
  const displayedFaqs = showAll ? faqs : faqs.slice(0, 6)

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
            Feed Your Curiosity
          </h1>
          
          <p 
            className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Get answers to common questions about our services, pricing, process, and how we can help your business thrive
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-16 px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 lg:mb-12">
            <p className="text-xs lg:text-sm tracking-wider mb-2">FREQUENTLY ASKED</p>
            <h2 className="text-4xl lg:text-5xl font-bold mb-3 lg:mb-4">Questions</h2>
            <p className="text-sm lg:text-base text-gray-600">
              Anything unclear? <a href="mailto:hello@bphgrowth.com" className="text-black hover:text-[#60a5fa] transition-colors">hello@bphgrowth.com</a>
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a2332]"></div>
            </div>
          )}

          {/* Empty State */}
          {!loading && faqs.length === 0 && (
            <div className="text-center py-20">
              <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No FAQs Available</h3>
              <p className="text-gray-600">Check back soon for answers to common questions</p>
            </div>
          )}

          {/* FAQ Accordion */}
          {!loading && faqs.length > 0 && (
            <>
              <div className="space-y-4 mb-12">
                {displayedFaqs.map((faq, index) => (
                  <div key={faq.id} className="border-b border-gray-300">
                    {/* Question Header */}
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex items-center justify-between py-5 text-left transition-colors"
                    >
                      <h3 className="text-base lg:text-lg font-semibold pr-8">
                        {faq.question}
                      </h3>
                      
                      {/* Plus/Minus Icon */}
                      <div className="shrink-0 w-6 h-6 flex items-center justify-center">
                        {openIndex === index ? (
                          // Minus icon
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        ) : (
                          // Plus icon
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        )}
                      </div>
                    </button>

                    {/* Answer - Expandable */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openIndex === index ? 'max-h-96 pb-5' : 'max-h-0'
                      }`}
                    >
                      <p className="text-sm lg:text-base text-gray-600 leading-relaxed pr-8">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {!showAll && faqs.length > 6 && (
                <div className="flex justify-center mt-8 lg:mt-12">
                  <button
                    onClick={() => setShowAll(true)}
                    className="bg-[#1a2332] text-white px-8 py-3 rounded-full text-base font-semibold hover:bg-[#2a3f52] transition-colors"
                  >
                    Load More
                  </button>
                </div>
              )}

              {/* Show Less Button */}
              {showAll && (
                <div className="flex justify-center mt-8 lg:mt-12">
                  <button
                    onClick={() => {
                      setShowAll(false)
                      setOpenIndex(null) // Close any open FAQs
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full text-base font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Show Less
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default FAQs