import rateLimit from 'express-rate-limit'

export const publicLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { success: false, message: "Too many requests, slow down." },
})

export const uploadLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { success: false, message: "Too many uploads, slow down." }
})
export const adminLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: { success: false, message: "Admin rate limit exceeded." },
})
