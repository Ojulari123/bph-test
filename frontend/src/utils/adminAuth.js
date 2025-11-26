// Unified admin authentication utility
export const getAdminAuth = () => {
  // Check all possible admin auth flags (NO insightAdmin)
  const isAuth = 
    localStorage.getItem('adminAuthenticated') ||
    localStorage.getItem('consultationAdminAuth') ||
    localStorage.getItem('loanAdminAuth')

  // Get any available admin token (NO insightAdminToken)
  const token = 
    localStorage.getItem('adminToken') ||
    localStorage.getItem('consultationAdminToken') ||
    localStorage.getItem('loanAdminToken')

  return { isAuth, token }
}

export const getAdminRedirectPath = () => {
  // Return the appropriate login path based on what's available
  if (localStorage.getItem('adminAuthenticated')) return '/admin/login'
  if (localStorage.getItem('consultationAdminAuth')) return '/admin/consultation-login'
  if (localStorage.getItem('loanAdminAuth')) return '/admin/loan-login'
  return '/admin/login' // Default
}