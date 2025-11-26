import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../config/api'

function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await api.post('/auth/admin/login', { password })

      if (response.data.success) {
        // Store token and auth flag
        localStorage.setItem('adminToken', response.data.token)
        localStorage.setItem('adminAuthenticated', 'true')
        
        // Set default authorization header
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        
        navigate('/admin/dashboard')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1a2332] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl p-8 lg:p-12 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1a2332] mb-2">Admin Portal</h1>
          <p className="text-gray-600">Enter your password to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold mb-2 text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
              placeholder="Enter admin password"
              required
              disabled={loading}
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#60a5fa] text-white py-3 rounded-lg font-semibold hover:bg-[#3b82f6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-gray-600 hover:text-[#60a5fa]">
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin