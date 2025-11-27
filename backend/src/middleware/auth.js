import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Invalid or expired token'
        })
      }

      req.user = user
      next()
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Authentication error',
      error: error.message
    })
  }
}

// Updated: Accept ALL admin types
export const authorizeAdmin = (req, res, next) => {
  try {
    const allowedRoles = ['admin', 'consultation_admin', 'loan_admin']
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      })
    }
    
    next()
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Authorization error',
      error: error.message
    })
  }
}

// For consultation-specific routes
export const authorizeConsultationAdmin = (req, res, next) => {
  try {
    const allowedRoles = ['admin', 'consultation_admin']
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Consultation admin role required.'
      })
    }
    
    next()
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Authorization error',
      error: error.message
    })
  }
}

// For loan-specific routes
export const authorizeLoanAdmin = (req, res, next) => {
  try {
    const allowedRoles = ['admin', 'loan_admin']
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Loan admin role required.'
      })
    }
    
    next()
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Authorization error',
      error: error.message
    })
  }
}