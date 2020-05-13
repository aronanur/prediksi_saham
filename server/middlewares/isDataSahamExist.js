const { DataSaham }  = require('../models/index');
const createError = require('http-errors');

module.exports = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await DataSaham.findByPk(id);

    if(data !== null){
      next();
    }else{
      throw createError(404, { name: 'NotFound', message: 'Data saham tidak ditemukan' })
    }
  } catch (error) {
    next(error)
  }
}