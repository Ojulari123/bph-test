import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../config/api'

function LatestInsights() {
  const [insights, setInsights] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInsights()
  }, [])

  const fetchInsights = async () => {
    try {
      const response = await api.get('/insights')
      
      if (response.data.success) {
        // Get only the 3 most recent active insights
        const activeInsights = response.data.data
          .filter(insight => insight.isActive)
          .slice(0, 3)
        
        setInsights(activeInsights)
      }
    } catch (error) {
      console.error('Error fetching insights:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-12 lg:py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a2332]"></div>
          </div>
        </div>
      </section>
    )
  }

  if (insights.length === 0) {
    return (
      <section className="py-12 lg:py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-center">Latest Insights</h2>
          <p className="text-gray-600 text-center mb-12 lg:mb-16">
            Check back soon for expert insights and thought leadership
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 lg:py-20 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Latest Insights</h2>
          <p className="text-gray-600 text-base lg:text-lg max-w-3xl mx-auto">
            Stay informed with our latest thoughts on business strategy, growth, and innovation
          </p>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="h-56 overflow-hidden bg-gray-200">
                <img
                  src={insight.image}
                  alt={insight.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category */}
                <span className="inline-block px-3 py-1 bg-[#60a5fa] text-white text-xs font-semibold rounded-full mb-3">
                  {insight.category}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-[#60a5fa] transition-colors">
                  {insight.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {insight.description}
                </p>

                {/* Read More Link */}
                <Link
                  to={`/blogs#${insight.id}`}
                  className="inline-flex items-center text-[#60a5fa] font-semibold text-sm hover:gap-2 transition-all"
                >
                  Read More
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/blogs">
            <button className="bg-[#1a2332] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#2a3f52] transition-colors">
              View All Insights
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default LatestInsights