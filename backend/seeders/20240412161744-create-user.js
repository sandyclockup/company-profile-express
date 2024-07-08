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
const bcrypt = require("bcryptjs");
const md5 = require("md5");

async function createUser() {
  var gender_index = Math.floor(Math.random() * 2) + 1;
  var gender_name = parseInt(gender_index) === 1 ? "male" : "female";
  var first_name = faker.name.firstName(gender_name);
  return {
    email: faker.internet.email().toLowerCase(),
    phone: faker.phone.phoneNumber(),
    password: bcrypt.hashSync("p4ssw0rd!", 10),
    first_name: first_name,
    last_name: faker.name.lastName(),
    gender: parseInt(gender_index) === 1 ? "M" : "F",
    country: faker.address.country(),
    address: faker.address.streetAddress(),
    about_me: faker.lorem.paragraphs(),
    confirm_token: md5(faker.datatype.uuid()),
    status: 1,
    created_at: new Date(),
    updated_at: new Date(),
  };
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let users = [];
    let i;
    let max = 10;
    for (i = 1; i <= max; i++) {
      let obj = await createUser(i === 1 ? 1 : 0);
      users.push(obj);
    }

    queryInterface.bulkDelete("users", null, {});
    return queryInterface.bulkInsert("users", users, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};