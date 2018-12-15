'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('People', [
          {
          name: 'Кочмар Денис',
          getId: 21,
          except: 42,
            createdAt: new Date(), updatedAt: new Date()
        },
        {
          name: 'Самойленко Олександра',
          getId: 42,
          except: 21,
          createdAt: new Date(), updatedAt: new Date()
        },
        {
          name: 'Маруняк Станіслав',
          getId: 63,
          except: 105,
          createdAt: new Date(), updatedAt: new Date()
        },
        {
          name: 'Артим Лілія',
          getId: 105,
          except: 63,
          createdAt: new Date(), updatedAt: new Date()
        },
        {
          name: 'Маїк Роман',
          getId: 168,
          except: 273,
          createdAt: new Date(), updatedAt: new Date()
        },
        {
          name: 'Прокопович Дарина',
          getId: 273,
          except: 168,
          createdAt: new Date(), updatedAt: new Date()
        },
        {
          name: 'Руссо Софія',
          getId: 441,
          except: 714,
          createdAt: new Date(), updatedAt: new Date()
        },
        {
          name: 'Сольнічок Назаар',
          getId: 714,
          except: 441,
          createdAt: new Date(), updatedAt: new Date()
        },
        {
          name: 'Добош Михайло',
          getId: 1155,
          createdAt: new Date(), updatedAt: new Date()
        },
        {
          name: 'Комар Надія',
          getId: 1869,
          createdAt: new Date(), updatedAt: new Date()
        }
          ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('People', null, {});

  }
};
