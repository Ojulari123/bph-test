import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import api from '../../config/api'

function AdminDashboard() {
  const [stats, setStats] = useState({
    pendingConsultations: 0,
    pendingLoans: 0,
    totalFAQs: 0,
    publishedInsights: 0
  })
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Fetch all stats in parallel
      const [consultationsRes, loansRes, faqsRes, insightsRes] = await Promise.all([
        api.get('/consultations', {
          headers: { Authorization: `Bearer ${localStorage.getItem('consultationAdminToken')}` }
        }).catch(() => ({ data: { data: [] } })),
        
        api.get('/loans', {
          headers: { Authorization: `Bearer ${localStorage.getItem('loanAdminToken')}` }
        }).catch(() => ({ data: { data: [] } })),
        
        api.get('/faqs').catch(() => ({ data: { data: [] } })),
        
        api.get('/insights').catch(() => ({ data: { data: [] } }))
      ])

      // Count pending consultations
      const pendingConsultations = consultationsRes.data.data?.filter(
        c => c.status === 'pending'
      ).length || 0

      // Count pending loans
      const pendingLoans = loansRes.data.data?.filter(
        l => l.status === 'pending'
      ).length || 0

      // Count total FAQs
      const totalFAQs = faqsRes.data.data?.length || 0

      // Count published insights
      const publishedInsights = insightsRes.data.data?.filter(
        i => i.isActive
      ).length || 0

      setStats({
        pendingConsultations,
        pendingLoans,
        totalFAQs,
        publishedInsights
      })

      // Build recent activity from consultations and loans
      const activities = []

      // Add recent consultations (last 5)
      const recentConsultations = consultationsRes.data.data
        ?.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
        .slice(0, 5) || []

      recentConsultations.forEach(c => {
        activities.push({
          type: 'consultation',
          message: 'New consultation application',
          user: c.fullName,
          timestamp: c.submittedAt,
          color: 'bg-blue-500'
        })
      })

      // Add recent loans (last 5)
      const recentLoans = loansRes.data.data
        ?.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
        .slice(0, 5) || []

      recentLoans.forEach(l => {
        activities.push({
          type: 'loan',
          message: 'New loan application',
          user: l.fullName,
          timestamp: l.submittedAt,
          color: 'bg-green-500'
        })
      })

      // Sort by timestamp and take top 10
      activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      setRecentActivity(activities.slice(0, 10))

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const past = new Date(timestamp)
    const diffInSeconds = Math.floor((now - past) / 1000)

    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
    return past.toLocaleDateString()
  }

  const statCards = [
    {
      title: 'Pending Consultations',
      value: stats.pendingConsultations,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'bg-blue-500'
    },
    {
      title: 'Pending Loan Applications',
      value: stats.pendingLoans,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-green-500'
    },
    {
      title: 'Total FAQs',
      value: stats.totalFAQs,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-purple-500'
    },
    {
      title: 'Published Insights',
      value: stats.publishedInsights,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      color: 'bg-orange-500'
    }
  ]

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={fetchDashboardData}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg text-white`}>
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
              
              {recentActivity.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No recent activity</p>
              ) : (
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className={`w-2 h-2 ${activity.color} rounded-full`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">{activity.message}</p>
                        <p className="text-xs text-gray-600">
                          {activity.user} • {formatTimeAgo(activity.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard