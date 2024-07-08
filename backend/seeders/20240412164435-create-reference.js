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
const slugify = require("slugify");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let references = [];
    let articles = [
      "Health and wellness",
      "Technology and gadgets",
      "Business and finance",
      "Travel and tourism",
      "Lifestyle and fashion",
    ];

    let tags = [
      "Mental Health",
      "Fitness and Exercise",
      "Alternative Medicine",
      "Artificial Intelligence",
      "Network Security",
      "Cloud Computing",
      "Entrepreneurship",
      "Personal Finance",
      "Marketing and Branding",
      "Travel Tips and Tricks",
      "Cultural Experiences",
      "Destination Guides",
      "Beauty and Fashion Trends",
      "Celebrity News and Gossip",
      "Parenting and Family Life",
    ];

    let portfolios = [
      "3D Modeling",
      "Web Application",
      "Mobile Application",
      "Illustrator Design",
      "UX Design",
    ];

    articles.map((row) => {
      let obj = {
        slug: slugify(row).toLowerCase(),
        name: row,
        description: faker.lorem.paragraphs(1),
        type: 1,
        status: 1,
        created_at: new Date(),
        updated_at: new Date(),
      };
      references.push(obj);
    });

    tags.map((row) => {
      let obj = {
        slug: slugify(row).toLowerCase(),
        name: row,
        description: faker.lorem.paragraphs(1),
        type: 2,
        status: 1,
        created_at: new Date(),
        updated_at: new Date(),
      };
      references.push(obj);
    });

    portfolios.map((row) => {
      let obj = {
        slug: slugify(row).toLowerCase(),
        name: row,
        description: faker.lorem.paragraphs(1),
        type: 3,
        status: 1,
        created_at: new Date(),
        updated_at: new Date(),
      };
      references.push(obj);
    });

    queryInterface.bulkDelete("references", null, {});
    return queryInterface.bulkInsert("references", references, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("references", null, {});
  },
};
