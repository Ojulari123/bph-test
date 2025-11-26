import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../config/api'
import { useNotification } from '../../context/NotificationContext'

function LoanApplications() {
  const navigate = useNavigate()
  const { showSuccess, showError } = useNotification()
  const [applications, setApplications] = useState([])
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check authentication
  useEffect(() => {
    const isAuth = localStorage.getItem('loanAdminAuth')
    const token = localStorage.getItem('loanAdminToken')
    
    if (!isAuth || !token) {
      navigate('/admin/loan-login')
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
      const response = await api.get('/loans')
      
      if (response.data.success) {
        setApplications(response.data.data)
      }
    } catch (err) {
      console.error('Error fetching applications:', err)
      setError(err.response?.data?.message || 'Failed to load applications')
      
      // If unauthorized, redirect to login
      if (err.response?.status === 401) {
        localStorage.removeItem('loanAdminAuth')
        localStorage.removeItem('loanAdminToken')
        navigate('/admin/loan-login')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('loanAdminAuth')
    localStorage.removeItem('loanAdminToken')
    localStorage.removeItem('loanAdminUser')
    navigate('/admin/loan-login')
  }

  const handleApprove = async (id) => {
    try {
      const response = await api.patch(`/loans/${id}/approve`)
      
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
      console.error('Error approving loan:', err)
      
      // Show error notification
      showError(
        'Failed to approve application',
        'Please refresh and try again.'
      )
    }
  }

  const handleDeny = async (id) => {
    try {
      const response = await api.patch(`/loans/${id}/deny`)
      
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
      console.error('Error denying loan:', err)
      
      // Show error notification
      showError(
        'Failed to deny application',
        'Please refresh and try again.'
      )
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'denied': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const renderLoanDetails = (app) => {
    // Different fields based on loan type
    if (app.loanType === 'Personal Loan') {
      return (
        <>
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-1">Employment Status</p>
            <p className="text-gray-900">{app.employmentStatus}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-1">Monthly Income</p>
            <p className="text-gray-900">{app.monthlyIncome}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm font-semibold text-gray-600 mb-1">Loan Purpose</p>
            <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{app.loanPurpose}</p>
          </div>
        </>
      )
    } else if (app.loanType === 'Business Loan' || app.loanType === 'Equity Financing') {
      return (
        <>
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-1">Business Name</p>
            <p className="text-gray-900">{app.businessName}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-1">Registration Number</p>
            <p className="text-gray-900">{app.businessRegistration}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-1">Year Established</p>
            <p className="text-gray-900">{app.yearEstablished}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-1">Monthly Revenue</p>
            <p className="text-gray-900">{app.monthlyRevenue}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm font-semibold text-gray-600 mb-1">Business Purpose</p>
            <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{app.businessPurpose}</p>
          </div>
        </>
      )
    } else if (app.loanType === 'Personal Asset Financing') {
      return (
        <>
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-1">Asset Type</p>
            <p className="text-gray-900">{app.assetType}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-1">Asset Value</p>
            <p className="text-gray-900">{app.assetValue}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm font-semibold text-gray-600 mb-1">Asset Description</p>
            <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{app.assetDescription}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-1">Employment Status</p>
            <p className="text-gray-900">{app.employmentStatus}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-1">Monthly Income</p>
            <p className="text-gray-900">{app.monthlyIncome}</p>
          </div>
        </>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Loan Admin</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Loan Applications</h2>
          <p className="text-gray-600 mt-2">Review and manage loan requests</p>
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
            <p className="text-gray-600 text-lg">No loan applications yet.</p>
            <p className="text-gray-500 text-sm mt-2">Applications will appear here once users submit loan requests.</p>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loan Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.fullName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{app.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{app.loanType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{app.loanAmount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(app.submittedAt).toLocaleDateString()}
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
                <h2 className="text-2xl font-bold text-gray-800">Loan Application Details</h2>
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
                {/* Common Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Full Name</p>
                    <p className="text-gray-900">{selectedApplication.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Email</p>
                    <p className="text-gray-900">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Phone Number</p>
                    <p className="text-gray-900">{selectedApplication.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Loan Type</p>
                    <p className="text-gray-900">{selectedApplication.loanType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Loan Amount</p>
                    <p className="text-gray-900">{selectedApplication.loanAmount}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Repayment Period</p>
                    <p className="text-gray-900">{selectedApplication.repaymentPeriod}</p>
                  </div>
                  
                  {/* Loan Type Specific Fields */}
                  {renderLoanDetails(selectedApplication)}
                  
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Submitted</p>
                    <p className="text-gray-900">{new Date(selectedApplication.submittedAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {selectedApplication.status === 'pending' && (
                <div className="p-6 border-t border-gray-200 flex gap-4">
                  <button
                    onClick={() => handleApprove(selectedApplication.id)}
                    className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDeny(selectedApplication.id)}
                    className="flex-1 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                  >
                    Deny
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

export default LoanApplications