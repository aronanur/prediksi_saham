'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        password: '$2a$10$NLgcpOgjJj36f9vEvvcw/etMDGo8.L2Ol0/M1RRrTCPTudcbTTIzO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Users', null, {});
  }
};
