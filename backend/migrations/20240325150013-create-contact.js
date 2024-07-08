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
      .createTable("contacts", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT.UNSIGNED,
        },
        name: {
          type: Sequelize.STRING(191),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(191),
          allowNull: false,
        },
        subject: {
          type: Sequelize.STRING(191),
          allowNull: false,
        },
        message: {
          type: Sequelize.TEXT,
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
      .then(() => queryInterface.addIndex("contacts", ["name"]))
      .then(() => queryInterface.addIndex("contacts", ["email"]))
      .then(() => queryInterface.addIndex("contacts", ["subject"]))
      .then(() => queryInterface.addIndex("contacts", ["status"]))
      .then(() => queryInterface.addIndex("contacts", ["created_at"]))
      .then(() => queryInterface.addIndex("contacts", ["updated_at"]));
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("contacts");
  },
};
