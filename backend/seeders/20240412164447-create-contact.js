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
      let gender_index = Math.floor(Math.random() * 2) + 1;
      let gender_name = parseInt(gender_index) === 1 ? "male" : "female";
      let first_name = faker.name.firstName(gender_name);
      let name = first_name + " " + faker.name.lastName();
      let obj = {
        name: name,
        email: faker.internet.email().toLowerCase(),
        subject: faker.lorem.sentences(2),
        message: faker.lorem.paragraphs(1),
        status: 0,
        created_at: new Date(),
        updated_at: new Date(),
      };
      data.push(obj);
    }
    queryInterface.bulkDelete("contacts", null, {});
    return queryInterface.bulkInsert("contacts", data, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("contacts", null, {});
  },
};
