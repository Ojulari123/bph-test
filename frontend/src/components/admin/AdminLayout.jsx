import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'

function AdminLayout({ children }) {
  const navigate = useNavigate()

  useEffect(() => {
    // Check if admin is authenticated
    const isAuthenticated = localStorage.getItem('adminAuthenticated')
    if (!isAuthenticated) {
      navigate('/admin/login')
    }
  }, [navigate])

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}

export default AdminLayout