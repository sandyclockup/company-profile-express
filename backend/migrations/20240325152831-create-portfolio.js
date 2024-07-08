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
      .createTable("portfolios", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT.UNSIGNED,
        },
        customer_id: {
          allowNull: false,
          type: Sequelize.BIGINT.UNSIGNED,
        },
        reference_id: {
          allowNull: false,
          type: Sequelize.BIGINT.UNSIGNED,
        },
        title: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT("long"),
          allowNull: false,
        },
        project_date: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        project_url: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        status: {
          type: Sequelize.TINYINT,
          defaultValue: 0,
        },
        sort: {
          type: Sequelize.INTEGER,
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
      .then(() => queryInterface.addIndex("portfolios", ["customer_id"]))
      .then(() => queryInterface.addIndex("portfolios", ["reference_id"]))
      .then(() => queryInterface.addIndex("portfolios", ["title"]))
      .then(() => queryInterface.addIndex("portfolios", ["project_date"]))
      .then(() => queryInterface.addIndex("portfolios", ["sort"]))
      .then(() => queryInterface.addIndex("portfolios", ["status"]))
      .then(() => queryInterface.addIndex("portfolios", ["created_at"]))
      .then(() => queryInterface.addIndex("portfolios", ["updated_at"]))
      .then(() =>
        queryInterface.addConstraint("portfolios", {
          type: "FOREIGN KEY",
          fields: ["customer_id"],
          references: {
            table: "customers",
            field: "id",
          },
          onDelete: "no action",
          onUpdate: "no action",
        })
      )
      .then(() =>
        queryInterface.addConstraint("portfolios", {
          type: "FOREIGN KEY",
          fields: ["reference_id"],
          references: {
            table: "references",
            field: "id",
          },
          onDelete: "no action",
          onUpdate: "no action",
        })
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("portfolios");
  },
};
