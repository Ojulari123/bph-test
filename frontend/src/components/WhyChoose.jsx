import aiIcon from '../assets/icons/Artificial_Intelligence.svg'
import dollarIcon from '../assets/icons/Dollar_Bag.svg'
import handshakeIcon from '../assets/icons/Handshake.svg'
import guruIcon from '../assets/icons/Guru.svg'

function WhyChoose() {
  const features = [
    {
      title: "AI Advantage",
      description: "We don't guess, we use validated strategic data to forecast performance and vet strategies, reducing risk and increasing investor confidence.",
      icon: aiIcon
    },
    {
      title: "Guaranteed Executability",
      description: "We are one of the few firms that integrates strategy with a dedicated operational execution playbook, ensuring concrete system architecture and workflows.",
      icon: handshakeIcon
    },
    {
      title: "Holistic Resilience",
      description: "We integrate rigorous planning with essential mindset training (The Business Clinic), ensuring the founder is just as ready as the business plan.",
      icon: guruIcon
    },
    {
      title: "Unrivaled Funding Access",
      description: "Our service connects strategy directly to capital. Clients who complete our planning process gain preferential access and terms to the BPH Growth Fund.",
      icon: dollarIcon
    }
  ]

  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 lg:mb-16">
          Why Entrepreneurs Choose BPH Growth
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="relative flex flex-col">
              {/* Custom dashed divider with 8 dashes - Desktop only */}
              {index !== features.length - 1 && (
                <div className="hidden lg:flex absolute -right-4 top-0 h-full flex-col justify-between py-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-0.5 bg-black h-[8%]" />
                  ))}
                </div>
              )}
              
              <div className="text-center flex flex-col h-full">
                {/* Icon */}
                <div className="w-16 h-16 lg:w-24 lg:h-24 mx-auto mb-4 lg:mb-6 flex items-center justify-center">
                  <img src={feature.icon} alt={feature.title} className="w-full h-full object-contain" />
                </div>
                
                <h3 className="text-base lg:text-xl font-bold mb-3 lg:mb-4 min-h-12 lg:h-14 flex items-center justify-center px-2">
                  {feature.title}
                </h3>
                
                <div className="grow flex items-start px-2 lg:px-4">
                  <p className="text-xs lg:text-sm leading-relaxed text-gray-700">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChoose