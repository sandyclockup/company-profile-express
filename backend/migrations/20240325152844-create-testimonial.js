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
      .createTable("testimonials", {
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
        image: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        name: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        position: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        quote: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        sort: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
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
        queryInterface.addConstraint("testimonials", {
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
      .then(() => queryInterface.addIndex("testimonials", ["customer_id"]))
      .then(() => queryInterface.addIndex("testimonials", ["image"]))
      .then(() => queryInterface.addIndex("testimonials", ["name"]))
      .then(() => queryInterface.addIndex("testimonials", ["sort"]))
      .then(() => queryInterface.addIndex("testimonials", ["position"]))
      .then(() => queryInterface.addIndex("testimonials", ["status"]))
      .then(() => queryInterface.addIndex("testimonials", ["created_at"]))
      .then(() => queryInterface.addIndex("testimonials", ["updated_at"]));
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("testimonials");
  },
};
