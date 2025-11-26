import { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import api from '../config/api'
import { useNotification } from '../context/NotificationContext'

function ResourceCenter() {
  const { showSuccess, showError } = useNotification()
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedResource, setSelectedResource] = useState(null)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    })
    fetchResources()
  }, [])

  const fetchResources = async () => {
    try {
      const response = await api.get('/resources')

      if (response.data.success) {
        setResources(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching resources:', error)
    } finally {
      setLoading(false)
    }
  }

  const openDownloadModal = (resource) => {
    setSelectedResource(resource)
    setEmail('')
    document.body.style.overflow = 'hidden'
  }

  const closeDownloadModal = () => {
    setSelectedResource(null)
    setEmail('')
    setIsSubmitting(false)
    document.body.style.overflow = 'unset'
  }

  const handleDownload = async (e) => {
    e.preventDefault()

    if (!email) {
      showError(
        'Email Required',
        'Please enter your email address to download the resource.'
      )
      return
    }

    setIsSubmitting(true)

    try {
      const response = await api.post('/resources/download', {
        email,
        resourceId: selectedResource.id
      })

      if (response.data.success) {
        // Instant download using the local file URL
        window.location.href = response.data.data.downloadUrl

        // Show success notification
        setTimeout(() => {
          showSuccess(
            `${selectedResource.title} is downloading now and has been sent to ${email}.`,
            ''
          )
          closeDownloadModal()
        }, 500)
      }
    } catch (error) {
      console.error('Error downloading resource:', error)
      
      // Show error notification
      showError(
        'Failed to download resource.',
        'Please refresh and try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

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
            Free Business Resources
          </h1>

          <p
            className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Download templates, guides, and tools to help you plan, launch, and grow your business. All resources are free and delivered directly to your inbox.
          </p>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-12 lg:py-16 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">
              Available Resources
            </h2>
            <p className="text-gray-600 text-base lg:text-lg">
              Access professional business templates and guides curated by our experts
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a2332]"></div>
            </div>
          )}

          {/* Empty State */}
          {!loading && resources.length === 0 && (
            <div className="text-center py-20">
              <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Resources Available</h3>
              <p className="text-gray-600">Check back soon for helpful business resources and templates</p>
            </div>
          )}

          {/* Resources Grid */}
          {!loading && resources.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col cursor-pointer transform hover:-translate-y-2"
                  onClick={() => openDownloadModal(resource)}
                >
                  {/* Image - Use placeholder if available, otherwise show default gradient */}
                  {resource.imageUrl ? (
                    <img
                      src={resource.imageUrl}
                      alt={resource.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="h-48 bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <div className="text-center text-white p-6">
                        <svg className="w-20 h-20 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-sm font-semibold uppercase tracking-wider">{resource.category}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-6 flex flex-col grow">
                    {/* Category */}
                    <p className="text-xs font-semibold tracking-wider text-[#60a5fa] mb-2 uppercase">
                      {resource.category}
                    </p>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 leading-tight mb-3">
                      {resource.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed grow">
                      {resource.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-500">{resource.fileType} • {resource.fileSize}</span>
                      <button className="flex items-center gap-2 text-[#60a5fa] font-semibold hover:gap-3 transition-all group text-sm">
                        Download
                        <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Download Modal */}
      {selectedResource && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
          onClick={closeDownloadModal}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedResource.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedResource.fileType} • {selectedResource.fileSize}
                  </p>
                </div>
                <button
                  onClick={closeDownloadModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleDownload} className="p-6">
              <p className="text-gray-700 mb-4">
                Enter your email address and we'll send you <strong>{selectedResource.title}</strong> immediately.
              </p>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa] transition-colors"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#60a5fa] text-white py-3 rounded-lg font-semibold hover:bg-[#3b82f6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Download & Send Me This Resource'}
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                By downloading, you agree to receive occasional emails from BPH Growth.
                You can unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default ResourceCenter