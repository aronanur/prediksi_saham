'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class DataSaham extends Model {}
  DataSaham.init({
    tanggal: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: 'Tanggal wajib diisi!'
        }
      }
    },
    harga_closed: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Harga closed wajib diisi!'
        }
      }
    }    
  }, { sequelize })
  DataSaham.associate = function(models) {
    // associations can be defined here
  };
  return DataSaham;
};