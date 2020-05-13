const bcrypt = require('bcryptjs');

class encryptHelper {

  static comparePassword(inputPassword, currentPassword){
    return bcrypt.compareSync(inputPassword, currentPassword)
  }

  static encryptPassword(password){
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
  }

}

module.exports = encryptHelper