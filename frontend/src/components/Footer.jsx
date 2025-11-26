import facebookIcon from '../assets/icons/Facebook.svg'
import linkedinIcon from '../assets/icons/LinkedIn.svg'
import instagramIcon from '../assets/icons/Instagram.svg'
import logo from '../assets/Logo.svg'

function Footer() {
  return (
    <footer className="bg-[#1a2332]">
      <div className="max-w-7xl mx-auto px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4">
          {/* Logo and Description */}
          <div className="lg:col-span-3">
            <a href="/" className="block mb-4">
              <img src={logo} alt="BPH Business + Plan Hub" className="h-10 lg:h-12 w-auto" />
            </a>
            <p className="text-sm text-gray-300 mb-6">
              The go-to support system for the SME/Start-up community in Nigeria, helping them achieve scale and growth.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              
              <a href="https://www.facebook.com/businessplans.hub" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded hover:opacity-80 transition-opacity">
                <img src={facebookIcon} alt="Facebook" className="w-6 h-6" />
              </a>
              
              
              <a href="https://www.linkedin.com/company/thebusinessplanhub" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded hover:opacity-80 transition-opacity">
                <img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6" />
              </a>
              
             
              <a href="https://www.instagram.com/businessplans.hub/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded hover:opacity-80 transition-opacity">
                <img src={instagramIcon} alt="Instagram" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="/about-us" className="text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="/services" className="text-gray-300 hover:text-white">Our Services</a></li>
              <li><a href="/faqs" className="text-gray-300 hover:text-white">FAQ</a></li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="lg:col-span-3">
            <h3 className="text-base font-bold mb-4 text-white">Our Services</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">Strategic Planning & Business Consulting</li>
              <li className="text-gray-300">AI Consulting & Digital Transformation</li>
              <li className="text-gray-300">Personal, Business & Asset Financing Loans</li>
              <li className="text-gray-300">Capital Access</li>
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-bold mb-4 text-white">Resources</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">Planning Guide</li>
              <li className="text-gray-300">Blog</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-bold mb-4 text-white">Contact us</h3>
            <div className="space-y-3 text-gray-300 text-sm">
              <p className="wrap-break-word">
                Email: <a href="mailto:support@bphgrowth.com" className="hover:text-white">support@bphgrowth.com</a>
              </p>
              <p>Phone: +234 708 009 6148</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-600">
        <div className="max-w-7xl mx-auto px-8 py-2 text-center">
          <p className="text-white text-sm">© 2025 BPH Growth. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer