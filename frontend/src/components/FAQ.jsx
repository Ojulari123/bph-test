import { useState, useEffect } from 'react'
import api from '../config/api'

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFAQs()
  }, [])

  const fetchFAQs = async () => {
    try {
      const response = await api.get('/faqs')
      
      if (response.data.success) {
        // Get only first 6 active FAQs
        const activeFAQs = response.data.data
          .filter(faq => faq.isActive)
          .slice(0, 6)
        
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

  if (loading) {
    return (
      <section className="py-16 px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1a2332]"></div>
          </div>
        </div>
      </section>
    )
  }

  if (faqs.length === 0) {
    return null // Don't show section if no FAQs
  }

  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm tracking-widest mb-2">FREQUENTLY ASKED</p>
          <h2 className="text-4xl lg:text-6xl font-bold mb-4">Questions</h2>
          <p className="text-sm lg:text-base text-gray-600">
            Anything unclear? <a href="mailto:hello@bphgrowth.com" className="text-black hover:text-[#60a5fa] transition-colors">hello@bphgrowth.com</a>
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
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

        <div className="text-center">
          <a href="/faqs">
            <button className="text-base lg:text-lg font-semibold hover:text-[#60a5fa] transition-colors">
              View All FAQs
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}

export default FAQ