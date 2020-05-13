const jwt = require('jsonwebtoken');

class JwtHelper {

  static signToken(payload){
    return jwt.sign(payload, process.env.SECRET_KEY)
  }

  static verifyToken(token){
    return jwt.verify(token, process.env.SECRET_KEY)
  }

}

module.exports = JwtHelper