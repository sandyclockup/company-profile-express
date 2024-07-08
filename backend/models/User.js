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
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
      firstName: {
        field: "first_name",
        type: DataTypes.STRING,
      },
      lastName: {
        field: "last_name",
        type: DataTypes.STRING,
      },
      gender: DataTypes.STRING,
      country: DataTypes.STRING,
      address: DataTypes.STRING,
      aboutMe: {
        field: "about_me",
        type: DataTypes.DATE,
      },
      resetToken: {
        field: "reset_token",
        type: DataTypes.STRING,
      },
      confirmToken: {
        field: "confirm_token",
        type: DataTypes.STRING,
      },
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
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
