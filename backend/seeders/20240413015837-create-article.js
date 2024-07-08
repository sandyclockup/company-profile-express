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
const slugify = require("slugify");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = [];
    for (var i = 1; i <= 10; i++) {
      let user = await models.User.findOne({
        order: [Sequelize.literal("RAND()")],
      });
      let title = faker.lorem.words(10);
      let slug = slugify(title);
      let obj = {
        user_id: user.id,
        image: "article" + i + ".jpg",
        title: title,
        slug: slug,
        description: faker.lorem.sentences(2),
        content: faker.lorem.paragraphs(5),
        status: 1,
        created_at: new Date(),
        updated_at: new Date(),
      };
      data.push(obj);
    }
    queryInterface.bulkDelete("articles", null, {});
    return queryInterface.bulkInsert("articles", data, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("articles", null, {});
  },
};
