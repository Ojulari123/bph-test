import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/Logo.svg'
import api from '../../config/api'

function LoanAdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await api.post('/auth/loan/login', {
        username,
        password
      })

      if (response.data.success) {
        // Store token and user info
        localStorage.setItem('loanAdminToken', response.data.token)
        localStorage.setItem('loanAdminAuth', 'true')
        localStorage.setItem('loanAdminUser', JSON.stringify(response.data.user))

        // Navigate to loans dashboard
        navigate('/admin/loans')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError(err.response?.data?.message || 'Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#1a2332] to-[#2a3f52] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={logo} alt="BPH Growth" className="h-16" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Loan Admin
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Access loan applications
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError('')
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
              placeholder="Enter username"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
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
              placeholder="Enter password"
              required
              disabled={loading}
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
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

        {/* Back Link */}
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-gray-600 hover:text-[#60a5fa]">
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  )
}

export default LoanAdminLogin