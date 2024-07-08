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
    for (var i = 1; i <= 9; i++) {
      let customer = await models.Customer.findOne({
        order: [Sequelize.literal("RAND()")],
      });
      let category = await models.Reference.findOne({
        order: [Sequelize.literal("RAND()")],
        where: { type: 3 },
      });
      let obj = {
        customer_id: customer.id,
        reference_id: category.id,
        title: faker.lorem.words(10),
        description: faker.lorem.paragraphs(2),
        project_date: faker.date.past(10),
        project_url: faker.internet.url(),
        status: 1,
        sort: i,
        created_at: new Date(),
        updated_at: new Date(),
      };
      data.push(obj);
    }
    queryInterface.bulkDelete("portfolios", null, {});
    return queryInterface.bulkInsert("portfolios", data, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("portfolios", null, {});
  },
};
