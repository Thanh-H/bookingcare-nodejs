'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '123456',
      firstName: 'Thanh',
      lastName: 'Ha',
      address: 'USA',
      phonenumber: '0345685910',
      gender: 1,
      image: 'https://symbols.vn/wp-content/uploads/2022/01/Hinh-Anime-Goku-ngau-nhat.jpg',
      roleId: 2,
      positionId: '2',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {

  }
};
