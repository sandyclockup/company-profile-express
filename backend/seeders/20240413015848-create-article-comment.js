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
    let user_ids = [];
    let articles = await models.Article.findAll();
    let users = await models.User.findAll();

    users.map((user, index) => {
      user_ids[index] = user.id;
    });

    articles.map((article) => {
      let user_id = user_ids[Math.floor(Math.random() * user_ids.length)];
      let obj = {
        article_id: article.id,
        user_id: user_id,
        comment: faker.lorem.paragraphs(1),
        status: 1,
        created_at: new Date(),
        updated_at: new Date(),
      };
      data.push(obj);
    });

    queryInterface.bulkDelete("articles_comments", null, {});
    return queryInterface.bulkInsert("articles_comments", data, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("articles_comments", null, {});
  },
};
