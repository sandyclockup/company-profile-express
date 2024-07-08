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
    let articles = await models.Article.findAll();

    await Promise.all(
      articles.map(async (article) => {

        let categories =  await models.Reference.findAll({
          attributes: ['id', 'name', 'slug'],
          order: [Sequelize.literal("RAND()")],
          where: { type: 1 },
          limit: 3,
        });
    
        let tags =  await models.Reference.findAll({
          attributes: ['id', 'name', 'slug'],
          order: [Sequelize.literal("RAND()")],
          where: { type: 2 },
          limit: 5,
        });

        let obj = {
            article_id: article.id,
            categories: JSON.stringify(categories),
            tags: JSON.stringify(tags),
        }

        data.push(obj)
          
      })
  )
   
   

    queryInterface.bulkDelete("article_references", null, {});
    return queryInterface.bulkInsert("article_references", data, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("article_references", null, {});
  },
};
