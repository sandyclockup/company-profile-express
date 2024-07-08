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
    let icons = [
      "bi bi-bicycle",
      "bi bi-bookmarks",
      "bi bi-box",
      "bi bi-building-add",
      "bi bi-calendar2-check",
      "bi bi-cart4",
      "bi bi-clipboard-data",
      "bi bi-gift",
      "bi bi-person-bounding-box"
    ];
    icons.map((icon, index) => {
      let sort = parseInt(index) + 1;
      let obj = {
        icon: icon,
        title: faker.lorem.sentence(8),
        description: faker.lorem.paragraphs(2),
        status: 1,
        sort: sort,
        created_at: new Date(),
        updated_at: new Date(),
      };
      data.push(obj);
    });
    queryInterface.bulkDelete("services", null, {});
    return queryInterface.bulkInsert("services", data, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("services", null, {});
  },
};
