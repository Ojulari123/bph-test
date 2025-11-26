import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LoanServices from '../components/LoanServices'
import LoanCalculator from '../components/LoanCalculator'
import LoanApplicationForm from '../components/LoanApplicationForm'

function BPHGrowthFund() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    })
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
            Unlock Your Financial Potential With Flexible Loan Solutions
          </h1>

          <p 
            className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            We provide fast, transparent, and tailored loan options to meet your needs.
          </p>
        </div>
      </section>

      {/* Loan Services */}
      <LoanServices />

      {/* Eligibility Criteria Section */}
      <section className="py-12 lg:py-16 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-2 lg:mb-3">Eligibility Criteria</h2>
          <p className="text-gray-600 text-base lg:text-lg mb-8 lg:mb-12">What you need to get a loan</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* General Requirements */}
            <div>
              <h3 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">General Requirements</h3>
              <ul className="space-y-3 lg:space-y-4">
                <li className="flex items-center gap-3">
                  <span className="text-lg lg:text-xl font-light">+</span>
                  <span className="text-sm lg:text-base text-gray-700">Nigerian citizen</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-lg lg:text-xl font-light">+</span>
                  <span className="text-sm lg:text-base text-gray-700">Age: 21–60 years</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-lg lg:text-xl font-light">+</span>
                  <span className="text-sm lg:text-base text-gray-700">Clear asset title/ownership documentation</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-lg lg:text-xl font-light">+</span>
                  <span className="text-sm lg:text-base text-gray-700">Stable income or business revenue</span>
                </li>
              </ul>
            </div>

            {/* Required Documents */}
            <div>
              <h3 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">Required Documents</h3>
              <ul className="space-y-3 lg:space-y-4">
                <li className="flex items-center gap-3">
                  <span className="text-lg lg:text-xl font-light">+</span>
                  <span className="text-sm lg:text-base text-gray-700">Valid means of identification</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-lg lg:text-xl font-light">+</span>
                  <span className="text-sm lg:text-base text-gray-700">Proof of income</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-lg lg:text-xl font-light">+</span>
                  <span className="text-sm lg:text-base text-gray-700">Proof of residence</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-lg lg:text-xl font-light">+</span>
                  <span className="text-sm lg:text-base text-gray-700">Asset documentation</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-lg lg:text-xl font-light">+</span>
                  <span className="text-sm lg:text-base text-gray-700">BVN (Bank Verification Number)</span>
                </li>
              </ul>
            </div>

            {/* Business Asset Financing */}
            <div>
              <h3 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">Business Asset Financing</h3>
              <ul className="space-y-3 lg:space-y-4">
                <li className="flex items-center gap-3">
                  <span className="text-lg lg:text-xl font-light">+</span>
                  <span className="text-sm lg:text-base text-gray-700">Business registration documents</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-lg lg:text-xl font-light">+</span>
                  <span className="text-sm lg:text-base text-gray-700">Business bank statements</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-lg lg:text-xl font-light">+</span>
                  <span className="text-sm lg:text-base text-gray-700">Tax identification number</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-lg lg:text-xl font-light">+</span>
                  <span className="text-sm lg:text-base text-gray-700">Asset documentation</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-lg lg:text-xl font-light">+</span>
                  <span className="text-sm lg:text-base text-gray-700">Business premises verification</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Calculator */}
      <LoanCalculator />

      {/* Loan Application Form */}
      <LoanApplicationForm />

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

export default BPHGrowthFund