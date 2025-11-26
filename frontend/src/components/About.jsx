function About() {
  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left side - Text content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Who We Are</h2>
            
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm lg:text-base">
              <p>
                We are BPH Growth, a pioneering firm dedicated to transforming entrepreneurs, startups, and SMEs into profitable, scalable ventures. We operate on a unique dual-engine model that integrates world-class strategic consulting with proprietary financial services. We don't just write plans; we provide the Capital, Strategy, and Operational Playbook required for successful execution.
              </p>
              
              <p>
                Our foundation is built on years of experience in Fintech, Banking, and Strategic Planning, backed by a proprietary AI system that turns raw data into predictive insights. We are your partner for sustainable growth, risk mitigation, and operational excellence in the competitive market.
              </p>
            </div>
          </div>

          {/* Right side - Image */}
          <div>
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80" 
              alt="Business meeting" 
              className="w-full h-auto rounded-2xl shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About