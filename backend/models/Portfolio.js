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
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Portfolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Portfolio.init(
    {
      customerId: {
        field: "customer_id",
        type: DataTypes.INTEGER,
      },
      referenceId: {
        field: "reference_id",
        type: DataTypes.INTEGER,
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      projectDate: {
        field: "project_date",
        type: DataTypes.DATE,
      },
      projectUrl: {
        field: "project_url",
        type: DataTypes.STRING,
      },
      sort: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
      },
      updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Portfolio",
      tableName: "portfolios",
    }
  );
  return Portfolio;
};
