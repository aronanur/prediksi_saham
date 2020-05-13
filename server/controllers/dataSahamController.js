const { DataSaham } = require('../models/index');

class DataSahamController { 

  static async listDataSaham(req, res, next){
    const pageSize = (req.query.page - 1) * req.query.pageSize;
    const limit = req.query.pageSize

    try {
      const listDataSaham = await DataSaham.findAndCountAll({ 
        offset: pageSize, 
        limit,
        order: [['id', 'DESC']],
      })
      res.status(200).json({
        statusCode: 200,
        count: listDataSaham.count,
        body: listDataSaham.rows
      })
    } catch (error) {
      next(error)
    }
  }

  static async getAllDataSaham(req, res, next){
    try {
      const listDataSaham = await DataSaham.findAll();
      res.status(200).json({
        statusCode: 200,
        body: listDataSaham
      })
    } catch (error) {
      next(error);
    }
  }

  static async multipleCreateDataSaham(req, res, next){
    const { listSaham } = req.body;
    try {
      const multipeInput = await DataSaham.bulkCreate(listSaham);
      res.status(201).json({
        statusCode: 201,
        statusText: 'Sukses upload data saham!',
        body: multipeInput
      })
    } catch (error) {
      next(error);
    }
  }

  static async createDataSaham(req, res, next){
    const { tanggal, harga_closed } = req.body;
    
    try {
      const createData = await DataSaham.create({ tanggal, harga_closed });
      res.status(201).json({
        statusCode: 201,
        statusText: 'Sukses menambahkan data saham!',
        body: createData
      }) 
    } catch (error) {
      next(error);
    }
  }

  static async dataSaham(req, res, next){
    const id = req.params.id;
    try {
      const data = await DataSaham.findByPk(id);
      res.status(200).json({
        statusCode: 200,
        body: data
      })
    } catch (error) {
      next(error)
    }
  }

  static async updateDataSaham(req, res, next){
    const id = req.params.id;
    const { tanggal, harga_closed } = req.body;
    try {
       const updateData = await DataSaham.update({ tanggal, harga_closed }, { where: { id }, returning: true })
       res.status(200).json({
         statusCode: 200,
         statusText: 'Sukses mengupdate data saham',
         body: updateData[1][0]
       })
    } catch (error) {
      next(error)
    }
  }

  static async deleteAllData(req, res, next){
    try {
      const deleteData = await DataSaham.destroy({
        where: {},
        truncate: true
      })
      res.status(200).json({
        statusCode: 200,
        statusText: 'Sukses menghapus data saham',
        body: deleteData
      })
    } catch (error) {
      console.log(error)
      next(error);
    }
  }

  static async deleteDataSaham(req, res, next){
    const id = req.params.id;
    try {
      const deleteData = await DataSaham.destroy({ where: { id } });
      res.status(200).json({
        statusCode: 200,
        statusText: 'Sukses menghapus data saham',
        body: deleteData
      })
    } catch (error) {
      next(error) 
    }
  }

}

module.exports = DataSahamController;