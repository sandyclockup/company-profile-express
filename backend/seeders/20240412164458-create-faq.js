/**
 * This file is part of the Sandy Andryanto Company Profile Website.
 *
 * @author     Sandy Andryanto <sandy.andryanto.dev@gmail.com>
 * @copyright  2024
 *
 * For the full copyright and license information,
 * please view the LICENSE.md file that was distributed
 * with this source code.
 */

"use strict";

const faker = require("faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = [];
    for (var i = 1; i <= 10; i++) {
      let obj = {
        question: faker.lorem.sentence(8),
        answer: faker.lorem.paragraphs(2),
        sort: i,
        status: 1,
        created_at: new Date(),
        updated_at: new Date(),
      };
      data.push(obj);
    }
    queryInterface.bulkDelete("faqs", null, {});
    return queryInterface.bulkInsert("faqs", data, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("faqs", null, {});
  },
};
