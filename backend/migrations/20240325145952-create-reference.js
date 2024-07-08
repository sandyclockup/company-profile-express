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
      .createTable("references", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT.UNSIGNED,
        },
        slug: {
          type: Sequelize.STRING(191),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(191),
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        type: {
          type: Sequelize.TINYINT,
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
      .then(() => queryInterface.addIndex("references", ["slug"]))
      .then(() => queryInterface.addIndex("references", ["name"]))
      .then(() => queryInterface.addIndex("references", ["type"]))
      .then(() => queryInterface.addIndex("references", ["status"]))
      .then(() => queryInterface.addIndex("references", ["created_at"]))
      .then(() => queryInterface.addIndex("references", ["updated_at"]));
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("references");
  },
};
