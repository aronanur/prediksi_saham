const valurFormatter = require('../helpers/formatValueHelper');

module.exports = (err, req, res, next) => {
  console.log(err.name)
 try {
   switch (err.name) {
     case 'AuthenticationFailed':
       res.json({
         statusCode: 403,
         message: err.message
       })
       break;

    case 'Unauthorized':
      res.json({
        statusCode: 401,
        message: err.message
      })
      break;

    case 'NotFound':
      res.json({
        statusCode: 404,
        message: err.message
      })
      break;

    case 'SequelizeValidationError':
      res.json({
        statusCode: 400,
        message: valurFormatter.validationErrorFormat(err.errors)
      })
   
     default:
        res.status(500).json('Server Error')
       break;
   }
 } catch (error) {
   res.status(500).json('Internal Server Error')
 } 
}