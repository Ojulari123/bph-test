import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../config/api'
import { useNotification } from '../../context/NotificationContext'

function ConsultationApplications() {
  const navigate = useNavigate()
  const { showSuccess, showError } = useNotification()
  const [applications, setApplications] = useState([])
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check authentication
  useEffect(() => {
    const isAuth = localStorage.getItem('consultationAdminAuth')
    const token = localStorage.getItem('consultationAdminToken')

    if (!isAuth || !token) {
      navigate('/admin/consultation-login')
      return
    }

    // Set token in api config
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    fetchApplications()
  }, [navigate])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get('/consultations')

      if (response.data.success) {
        setApplications(response.data.data)
      }
    } catch (err) {
      console.error('Error fetching applications:', err)
      setError(err.response?.data?.message || 'Failed to load applications')

      // If unauthorized, redirect to login
      if (err.response?.status === 401) {
        localStorage.removeItem('consultationAdminAuth')
        localStorage.removeItem('consultationAdminToken')
        navigate('/admin/consultation-login')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('consultationAdminAuth')
    localStorage.removeItem('consultationAdminToken')
    localStorage.removeItem('consultationAdminUser')
    navigate('/admin/consultation-login')
  }

  const handleApprove = async (id) => {
    try {
      const response = await api.patch(`/consultations/${id}/approve`)

      if (response.data.success) {
        // Update local state
        setApplications(applications.map(app =>
          app.id === id ? { ...app, status: 'approved' } : app
        ))
        setSelectedApplication(null)
        
        // Show success notification
        showSuccess(
          'Application approved!',
          'User will receive a confirmation email.'
        )
      }
    } catch (err) {
      console.error('Error approving application:', err)
      
      // Show error notification
      showError(
        'Failed to approve application',
        'Please refresh and try again.'
      )
    }
  }

  const handleDeny = async (id) => {
    try {
      const response = await api.patch(`/consultations/${id}/deny`)

      if (response.data.success) {
        // Update local state
        setApplications(applications.map(app =>
          app.id === id ? { ...app, status: 'denied' } : app
        ))
        setSelectedApplication(null)
        
        // Show success notification
        showSuccess(
          'Application denied',
          'User will be notified via email.'
        )
      }
    } catch (err) {
      console.error('Error denying application:', err)
      
      // Show error notification
      showError(
        'Failed to deny application',
        'Please refresh and try again.'
      )
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'denied': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Consultation Admin</h1>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/admin/slots')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm"
              >
                Manage Slots
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Consultation Applications</h2>
          <p className="text-gray-600 mt-2">Review and manage consultation requests</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading applications...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchApplications}
              className="mt-2 text-red-700 underline hover:text-red-800"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && applications.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-600 text-lg">No consultation applications yet.</p>
            <p className="text-gray-500 text-sm mt-2">Applications will appear here once users submit consultation requests.</p>
          </div>
        )}

        {/* Applications List */}
        {!loading && !error && applications.length > 0 && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Industry</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Scheduled</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.fullName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{app.companyName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{app.industrySector}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex flex-col">
                          <span className="font-semibold">
                            {new Date(app.scheduledDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          <span className="text-xs text-green-600 font-medium">{app.scheduledTime}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => setSelectedApplication(app)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Application Details Modal */}
        {selectedApplication && (
          <div
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={() => setSelectedApplication(null)}
          >
            <div
              className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Application Details</h2>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-4">
                {/* Scheduled Appointment - Highlighted Section */}
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <h3 className="text-xl font-bold text-green-900">Scheduled Consultation</h3>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {new Date(selectedApplication.scheduledDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-3xl font-bold text-green-600 mt-2">
                      {selectedApplication.scheduledTime}
                    </p>
                  </div>
                </div>

                {/* Applicant Information */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b-2 border-gray-200">
                    Applicant Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Full Name</p>
                      <p className="text-gray-900">{selectedApplication.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Business Email</p>
                      <p className="text-gray-900">{selectedApplication.businessEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Company Name</p>
                      <p className="text-gray-900">{selectedApplication.companyName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Industry Sector</p>
                      <p className="text-gray-900">{selectedApplication.industrySector}</p>
                    </div>
                  </div>
                </div>

                {/* Business Details */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b-2 border-gray-200">
                    Business Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Business Stage</p>
                      <p className="text-gray-900">{selectedApplication.currentBusinessStage}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Service Interest</p>
                      <p className="text-gray-900">{selectedApplication.primaryServiceInterest}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Target Funding</p>
                      <p className="text-gray-900">{selectedApplication.targetFundingAmount || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Submitted</p>
                      <p className="text-gray-900">{new Date(selectedApplication.submittedAt).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Business Summary */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b-2 border-gray-200">
                    Business Summary
                  </h3>
                  <p className="text-gray-900 bg-gray-50 p-4 rounded-lg leading-relaxed">
                    {selectedApplication.businessSummary}
                  </p>
                </div>

                {/* Application Status */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Application Status</p>
                      <p className="text-lg font-bold text-gray-900 capitalize">{selectedApplication.status}</p>
                    </div>
                    <span className={`px-4 py-2 text-sm font-semibold rounded-full ${selectedApplication.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        selectedApplication.status === 'approved' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                      }`}>
                      {selectedApplication.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {selectedApplication.status === 'pending' && (
                <div className="p-6 border-t border-gray-200 flex gap-4">
                  <button
                    onClick={() => handleApprove(selectedApplication.id)}
                    className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => handleDeny(selectedApplication.id)}
                    className="flex-1 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                  >
                    ✕ Deny
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConsultationApplications