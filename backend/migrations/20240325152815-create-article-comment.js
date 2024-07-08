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
      .createTable("articles_comments", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT.UNSIGNED,
        },
        parent_id: {
          allowNull: true,
          type: Sequelize.BIGINT.UNSIGNED,
        },
        article_id: {
          allowNull: false,
          type: Sequelize.BIGINT.UNSIGNED,
        },
        user_id: {
          allowNull: false,
          type: Sequelize.BIGINT.UNSIGNED,
        },
        comment: {
          type: Sequelize.TEXT("long"),
          allowNull: true,
        },
        status: {
          type: Sequelize.TINYINT,
          defaultValue: 0,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() => queryInterface.addIndex("articles_comments", ["parent_id"]))
      .then(() => queryInterface.addIndex("articles_comments", ["article_id"]))
      .then(() => queryInterface.addIndex("articles_comments", ["user_id"]))
      .then(() => queryInterface.addIndex("articles_comments", ["status"]))
      .then(() => queryInterface.addIndex("articles_comments", ["created_at"]))
      .then(() => queryInterface.addIndex("articles_comments", ["updated_at"]))
      .then(() =>
        queryInterface.addConstraint("articles_comments", {
          type: "FOREIGN KEY",
          fields: ["parent_id"],
          references: {
            table: "articles_comments",
            field: "id",
          },
          onDelete: "no action",
          onUpdate: "no action",
        })
      )
      .then(() =>
        queryInterface.addConstraint("articles_comments", {
          type: "FOREIGN KEY",
          fields: ["article_id"],
          references: {
            table: "articles",
            field: "id",
          },
          onDelete: "no action",
          onUpdate: "no action",
        })
      )
      .then(() =>
        queryInterface.addConstraint("articles_comments", {
          type: "FOREIGN KEY",
          fields: ["user_id"],
          references: {
            table: "users",
            field: "id",
          },
          onDelete: "no action",
          onUpdate: "no action",
        })
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("articles_comments");
  },
};
