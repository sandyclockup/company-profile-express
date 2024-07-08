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
      .createTable("teams", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT.UNSIGNED,
        },
        image: {
          type: Sequelize.STRING(191),
          allowNull: true,
        },
        name: {
          type: Sequelize.STRING(191),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(191),
          allowNull: false,
        },
        phone: {
          type: Sequelize.STRING(191),
          allowNull: false,
        },
        position_name: {
          type: Sequelize.STRING(191),
          allowNull: false,
        },
        facebook: {
          type: Sequelize.STRING(191),
          allowNull: true,
        },
        instagram: {
          type: Sequelize.STRING(191),
          allowNull: true,
        },
        twitter: {
          type: Sequelize.STRING(191),
          allowNull: true,
        },
        linked_in: {
          type: Sequelize.STRING(191),
          allowNull: true,
        },
        address: {
          type: Sequelize.TEXT,
          allowNull: true,
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
      .then(() => queryInterface.addIndex("teams", ["image"]))
      .then(() => queryInterface.addIndex("teams", ["name"]))
      .then(() => queryInterface.addIndex("teams", ["email"]))
      .then(() => queryInterface.addIndex("teams", ["phone"]))
      .then(() => queryInterface.addIndex("teams", ["position_name"]))
      .then(() => queryInterface.addIndex("teams", ["facebook"]))
      .then(() => queryInterface.addIndex("teams", ["instagram"]))
      .then(() => queryInterface.addIndex("teams", ["twitter"]))
      .then(() => queryInterface.addIndex("teams", ["linked_in"]))
      .then(() => queryInterface.addIndex("teams", ["sort"]))
      .then(() => queryInterface.addIndex("teams", ["status"]))
      .then(() => queryInterface.addIndex("teams", ["created_at"]))
      .then(() => queryInterface.addIndex("teams", ["updated_at"]));
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("teams");
  },
};
