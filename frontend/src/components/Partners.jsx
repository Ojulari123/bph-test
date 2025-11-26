function Partners() {
  const partners = [
    {
      name: "Partner 1",
      logo: "https://via.placeholder.com/150x60/e5e7eb/6b7280?text=Partner+1"
    },
    {
      name: "Partner 2",
      logo: "https://via.placeholder.com/150x60/e5e7eb/6b7280?text=Partner+2"
    },
    {
      name: "Partner 3",
      logo: "https://via.placeholder.com/150x60/e5e7eb/6b7280?text=Partner+3"
    },
    {
      name: "Partner 4",
      logo: "https://via.placeholder.com/150x60/e5e7eb/6b7280?text=Partner+4"
    },
    {
      name: "Partner 5",
      logo: "https://via.placeholder.com/150x60/e5e7eb/6b7280?text=Partner+5"
    }
  ]

  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Our Partners</h2>
        
        <div className="flex justify-center items-center gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="w-40 h-20 bg-gray-200 flex items-center justify-center">
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="w-full h-full object-contain p-4"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Partners