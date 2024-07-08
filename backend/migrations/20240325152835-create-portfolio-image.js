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
      .createTable("portfolios_images", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT.UNSIGNED,
        },
        portfolio_id: {
          allowNull: false,
          type: Sequelize.BIGINT.UNSIGNED,
        },
        image: {
          type: Sequelize.STRING(255),
          allowNull: false,
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
      .then(() =>
        queryInterface.addConstraint("portfolios_images", {
          type: "FOREIGN KEY",
          fields: ["portfolio_id"],
          references: {
            table: "portfolios",
            field: "id",
          },
          onDelete: "no action",
          onUpdate: "no action",
        })
      )
      .then(() =>
        queryInterface.addIndex("portfolios_images", ["portfolio_id"])
      )
      .then(() => queryInterface.addIndex("portfolios_images", ["image"]))
      .then(() => queryInterface.addIndex("portfolios_images", ["status"]))
      .then(() => queryInterface.addIndex("portfolios_images", ["created_at"]))
      .then(() => queryInterface.addIndex("portfolios_images", ["updated_at"]));
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("portfolios_images");
  },
};
