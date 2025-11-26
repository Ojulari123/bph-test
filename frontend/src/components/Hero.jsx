import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    })
  }, [])

  return (
    <section className="bg-[#1a2332] px-8 py-16 lg:py-36 rounded-b-[40px]">
      <div className="max-w-5xl mx-auto text-center">
        <h1
          className="text-3xl lg:text-5xl font-bold mb-6"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <span className="text-[#60a5fa]">Business Growth</span>
          <span className="text-white"> Meets </span>
          <span className="text-[#60a5fa]">Financial Freedom</span>
        </h1>

        <p
          className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-4xl mx-auto mb-8"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          From strategic business consulting and AI-powered planning to flexible loan solutions—we provide the expertise and capital you need to launch, scale, and sustain your business success.
        </p>

        {/* CTA Button */}
        <div
          className="flex justify-center"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <a href="/services#consultation-form">
            <button className="bg-[#60a5fa] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#3b82f6] transition-colors transform hover:scale-105">
              Schedule Consultation
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero