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
    let portfolios = await models.Portfolio.findAll();
    portfolios.map((portfolio) => {
      for (var index = 0; index < 3; index++) {
        let sort = parseInt(index) + 1;
        let obj = {
          portfolio_id: portfolio.id,
          image: "portfolio" + sort + ".jpg",
          status: parseInt(index) === 0 ? 1 : 0,
          created_at: new Date(),
          updated_at: new Date(),
        };
        data.push(obj);
      }
    });
    queryInterface.bulkDelete("portfolios_images", null, {});
    return queryInterface.bulkInsert("portfolios_images", data, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("portfolios_images", null, {});
  },
};
