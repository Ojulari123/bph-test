function CTA() {
  return (
    <section className="py-12 lg:py-20 px-8 bg-white border-t-2 border-b-2 border-[#1a2332]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl lg:text-5xl font-bold mb-4 lg:mb-6 text-[#1a2332]">
          Ready to Transform Your Business Idea into Reality?
        </h2>
        
        <p className="text-base lg:text-xl text-gray-700 mb-6 lg:mb-8">
          Join thousands of satisfied customers who trust us with their business growth
        </p>

        <a href="/services#consultation-form">
          <button className="bg-[#1a2332] text-white px-6 py-3 lg:px-10 lg:py-4 rounded-full text-base lg:text-lg font-semibold hover:bg-[#2a3f52] transition-colors transform hover:scale-105">
            Schedule Consultation
          </button>
        </a>
      </div>
    </section>
  )
}

export default CTA