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

const ROLE_GROUPS = {
  admin: ['admin', 'consultation_admin', 'loan_admin'],
  consultation: ['admin', 'consultation_admin'],
  loan: ['admin', 'loan_admin']
}

const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: no user context found'
        })
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: 'Access denied: insufficient role permissions'
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
}

export const authorizeAdmin = checkRole(ROLE_GROUPS.admin)
export const authorizeConsultationAdmin = checkRole(ROLE_GROUPS.consultation)
export const authorizeLoanAdmin = checkRole(ROLE_GROUPS.loan)