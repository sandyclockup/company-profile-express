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

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("article_references", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT.UNSIGNED,
        },
        article_id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.BIGINT.UNSIGNED,
        },
        categories: {
          type: Sequelize.TEXT("long"),
          allowNull: true,
        },
        tags: {
          type: Sequelize.TEXT("long"),
          allowNull: true,
        },
      })
      .then(() =>
        queryInterface.addConstraint("article_references", {
          type: "FOREIGN KEY",
          fields: ["article_id"],
          references: {
            table: "articles",
            field: "id",
          },
          onDelete: "no action",
          onUpdate: "no action",
        })
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("article_references");
  },
};
