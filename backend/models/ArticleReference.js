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
  class ArticleReference extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ArticleReference.init(
    {
      articleId: {
        field: "article_id",
        type: DataTypes.INTEGER,
      },
      categories: DataTypes.STRING,
      tags: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "ArticleReference",
      tableName: "article_references",
    }
  );
  return ArticleReference;
};
