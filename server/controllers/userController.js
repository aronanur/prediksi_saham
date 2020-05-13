const { User } = require('../models/index');
const createError = require('http-errors');
const encrypt = require('../helpers/encryptHelper');
const jwtHelper = require('../helpers/JwtHelper');

class UserController {

  static loginAdmin(req, res, next){
    const { username, password } = req.body

    User
      .findOne({
        where : {
          username
        }
      })
      .then(response => {
        if(response != null){
          if(encrypt.comparePassword(password, response.password)){
            const user = {
              id: response.id,
              username: response.username
            }

            const access_token = jwtHelper.signToken(user)
            res.status(200).json({
              statusCode: 200,
              body: {
                access_token,
                user
              }
            })

          }else{
            throw createError(404, { name: 'NotFound', message: 'Username atau password salah!' })
          }
        }else{
          throw createError(404, { name: 'NotFound', message: 'Pengguna tidak terdaftar!' })
        }
      })
      .catch(next)
  }

  static async dataAdmin(req, res, next){
    const id = req.user.id;;
    try {
      const data = await User.findOne({
        where: { id },
        attributes: {
          exclude: ['password', 'updatedAt', 'createdAt']
        }
      });
      if(data !== null){
        res.status(200).json({
          statusCode: 200,
          body: data
        })
      }else{
        throw createError(404, { name: 'NotFound', message: 'Pengguna tidak terdaftar!' })
      }
    } catch (error) {
      next(error);
    }
  }

}

module.exports = UserController;