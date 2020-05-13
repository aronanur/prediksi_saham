const JwtHelper = require('../helpers/JwtHelper');
const createError = require('http-errors');

module.exports = (req, res, next) => {
  try {
    const accesToken = req.headers.access_token
    const user = JwtHelper.verifyToken(accesToken)
    req.user = user
    next()
  } catch (error) {
    next(createError(403, { name: 'AuthenticationFailed', message: 'Authentication Failed' }))
  }
}