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
const models = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = [];
    let customers = await models.Customer.findAll();
    customers.map((row, index) => {
      let gender_index = Math.floor(Math.random() * 2) + 1;
      let gender_name = parseInt(gender_index) === 1 ? "male" : "female";
      let first_name = faker.name.firstName(gender_name);
      let name = first_name + " " + faker.name.lastName();
      let sort = parseInt(index) + 1;
      let obj = {
        customer_id: row.id,
        image: "testimonial" + sort + ".jpg",
        name: name,
        position: faker.name.jobTitle(),
        quote: faker.lorem.paragraphs(1),
        status: 1,
        sort: sort,
        created_at: new Date(),
        updated_at: new Date(),
      };
      data.push(obj);
    });
    queryInterface.bulkDelete("testimonials", null, {});
    return queryInterface.bulkInsert("testimonials", data, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("testimonials", null, {});
  },
};
