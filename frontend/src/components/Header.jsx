import { useState, useEffect, useRef } from 'react'
import logo from '../assets/Logo.svg'

function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null)
  const mobileMenuRef = useRef(null)

  const toggleMobileSection = (section) => {
    setMobileExpandedSection(mobileExpandedSection === section ? null : section)
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [mobileMenuOpen])

  return (
    <header className="bg-[#1a2332] px-8 lg:py-2 py-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Navigation grouped together */}
        <div className="flex items-center gap-12">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img src={logo} alt="BPH Business + Plan Hub" className="h-10 lg:h-12 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Services Dropdown */}
            <div
              className="relative z-50"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-white flex items-center gap-2 hover:text-gray-300 py-6">
                Services
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 pt-2 animate-fadeIn z-50">
                  <div className="w-[800px] bg-[#2a3f52] rounded-2xl shadow-xl p-8">
                    <div className="grid grid-cols-2 gap-8">
                      {/* BPH Growth Column */}
                      <div>
                        <a href="/services" className="text-[#60a5fa] font-bold mb-4 text-lg block hover:text-[#3b82f6] transition-colors">
                          BPH Growth
                        </a>
                        <ul className="space-y-2 mt-4">
                          <li className="text-white py-1">Business Consultation</li>
                          <li className="text-white py-1">Strategic Planning</li>
                          <li className="text-white py-1">AI Consulting & Digital Transformation</li>
                          <li className="text-white py-1">Business Clinic & Leadership Development</li>
                        </ul>
                      </div>

                      {/* BPH Growth Fund Column */}
                      <div>
                        <a href="/bph-growth-fund" className="text-[#60a5fa] font-bold mb-4 text-lg block hover:text-[#3b82f6] transition-colors">
                          BPH Growth Fund
                        </a>
                        <div className="grid grid-cols-2 gap-10 mt-4">
                          <div>
                            <p className="text-white font-semibold mb-2">Debt Consolidation</p>
                            <ul className="space-y-2">
                              <li className="text-white py-1">Personal Loans</li>
                              <li className="text-white py-1">Business Loans</li>
                              <li className="text-white py-1">Asset Loans</li>
                            </ul>
                          </div>
                          <div>
                            <p className="text-white font-semibold mb-2">Equity Financing</p>
                            <ul className="space-y-2">
                              <li className="text-white py-1">Real Estate</li>
                              <li className="text-white py-1">Angel Investment</li>
                              <li className="text-white py-1">Venture Capital</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Company Dropdown */}
            <div
              className="relative z-50"
              onMouseEnter={() => setActiveDropdown('company')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-white flex items-center gap-2 hover:text-gray-300 py-6">
                Company
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {activeDropdown === 'company' && (
                <div className="absolute top-full left-0 pt-2 animate-fadeIn z-50">
                  <div className="w-[300px] bg-[#2a3f52] rounded-2xl shadow-xl p-6">
                    <ul className="space-y-3">
                      <li>
                        <a href="/about-us" className="text-white hover:text-[#60a5fa] block py-2">
                          About Us
                        </a>
                      </li>
                      <li>
                        <a href="/contact-us" className="text-white hover:text-[#60a5fa] block py-2">
                          Contact Us
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Resource Center - Direct Link */}
            <a href="/resource-center" className="text-white hover:text-gray-300 py-6">
              Resource Center
            </a>

            {/* Blog - Direct Link */}
            <a href="/blogs" className="text-white hover:text-gray-300 py-6">
              Blog
            </a>
          </nav>
        </div>

        {/* Desktop Contact Button */}
        <a href="/contact-us" className="hidden lg:block">
          <button className="bg-[#60a5fa] text-white px-6 py-2 rounded-full hover:bg-[#3b82f6] transition-colors">
            Contact Us
          </button>
        </a>

        {/* Mobile Burger Menu Button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            // Close Icon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Burger Icon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className="lg:hidden absolute top-full left-0 right-0 bg-[#2a3f52] shadow-xl animate-fadeIn">
          <nav className="px-8 py-4">
            {/* Services Section */}
            <div className="border-b border-gray-600 pb-4 mb-4">
              <button
                onClick={() => toggleMobileSection('services')}
                className="w-full flex items-center justify-between text-white font-semibold py-2"
              >
                Services
                <svg
                  className={`w-5 h-5 transition-transform ${mobileExpandedSection === 'services' ? 'rotate-180' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {mobileExpandedSection === 'services' && (
                <div className="mt-3 ml-4 space-y-2">
                  <a href="/services" className="text-gray-300 block py-1">
                    BPH Growth
                  </a>
                  <a href="/bph-growth-fund" className="text-gray-300 block py-1">
                    BPH Growth Fund
                  </a>
                </div>
              )}
            </div>

            {/* Company Section */}
            <div className="border-b border-gray-600 pb-4 mb-4">
              <button
                onClick={() => toggleMobileSection('company')}
                className="w-full flex items-center justify-between text-white font-semibold py-2"
              >
                Company
                <svg
                  className={`w-5 h-5 transition-transform ${mobileExpandedSection === 'company' ? 'rotate-180' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {mobileExpandedSection === 'company' && (
                <div className="mt-3 ml-4 space-y-2">
                  <a href="/about-us" className="text-gray-300 block py-1">
                    About Us
                  </a>
                  <a href="/contact-us" className="text-gray-300 block py-1">
                    Contact Us
                  </a>
                </div>
              )}
            </div>

            {/* Resource Center - Direct Link */}
            <div className="border-b border-gray-600 pb-4 mb-4">
              <a href="/resource-center" className="text-white py-2 block">
                Resource Center
              </a>
            </div>

            {/* Blog - Direct Link */}
            <div className="pb-4">
              <a href="/blogs" className="text-white py-2 block">
                Blog
              </a>
            </div>
          </nav>
        </div>
      )}

      {/* Fade-in Animation Style */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </header>
  )
}

export default Header