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
  class ArticleComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ArticleComment.init(
    {
      parentId: {
        field: "parent_id",
        type: DataTypes.INTEGER,
      },
      articleId: {
        field: "article_id",
        type: DataTypes.INTEGER,
      },
      userId: {
        field: "user_id",
        type: DataTypes.INTEGER,
      },
      comment: DataTypes.STRING,
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
      modelName: "ArticleComment",
      tableName: "articles_comments",
    }
  );
  return ArticleComment;
};
