export const validateRequest = (schema) => {
  return async (req, res, next) => {
    try {
      const validated = await schema.parseAsync(req.body)
      req.body = validated
      next()
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors?.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      })
    }
  }
}