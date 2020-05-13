'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class User extends Model {}
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, { hooks: {
    beforeCreate: (instance, options) => {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(instance.password, salt);
      instance.password = hash
    },
    beforeUpdate: (instance, options) => {
      if(instance.password){
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash
      }
    }
  }, sequelize })
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};