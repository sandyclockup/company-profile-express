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

const db = require("../models");
const { Sequelize, Op, QueryTypes } = require("sequelize");
const auth_user = require('../helpers/auth_user');
const User = db.User;
const Article = db.Article;
const ArticleComment = db.ArticleComment;


async function list(req, res) {
 
  let page = req.query.page || 1;
  let limit = 3 * parseInt(page);
  let newArticle =  await db.sequelize.query(`
    SELECT 
        a.id,
        a.title,
        a.slug,
        a.description,
        a.created_at,
        u.first_name,
        u.last_name,
        u.image,
        u.gender,
        u.about_me,
        ar.categories
    FROM articles a
    INNER JOIN users u ON u.id = a.user_id
    INNER JOIN article_references ar ON ar.article_id = a.id
    WHERE a.status = 1 ORDER BY a.id DESC LIMIT 1 OFFSET 0
  `, { type: QueryTypes.SELECT })

  let newArticles = await db.sequelize.query(`
      SELECT 
        a.id,
        a.title,
        a.slug,
        a.description,
        a.created_at,
        u.first_name,
        u.last_name,
        u.image,
        u.gender,
        u.about_me,
        ar.categories
    FROM articles a
    INNER JOIN users u ON u.id = a.user_id
    INNER JOIN article_references ar ON ar.article_id = a.id
    WHERE a.status = 1 ORDER BY a.id DESC LIMIT 3 OFFSET 1
  `, { type: QueryTypes.SELECT })

  let Stories = await await db.sequelize.query(`
      SELECT 
          a.id,
          a.title,
          a.slug,
          a.description,
          a.created_at,
          u.first_name,
          u.last_name,
          u.image,
          u.gender,
          u.about_me,
          ar.categories
      FROM articles a
      INNER JOIN users u ON u.id = a.user_id
      INNER JOIN article_references ar ON ar.article_id = a.id
      WHERE a.status = 1 ORDER BY a.id DESC LIMIT `+limit+`
    `, { type: QueryTypes.SELECT })

  let totalActive = await Article.count({ where: { status: 1 } });

  let data = {
    continue: limit <= totalActive,
    new_article: newArticle[0],
    new_articles: newArticles,
    page: page,
    stories: Stories,
  };

  res.status(200).send({
    data: data,
    status: true,
    message: "ok",
  });
  return;
}

async function detail(req, res) {

  let slug = req.params.slug;
  let model = await db.sequelize.query(`
    SELECT 
        a.id,
        a.title,
        a.slug,
        a.description,
        a.content,
        a.created_at,
        u.first_name,
        u.last_name,
        u.image,
        u.gender,
        u.about_me,
        ar.categories
    FROM articles a
    INNER JOIN users u ON u.id = a.user_id
    INNER JOIN article_references ar ON ar.article_id = a.id
    WHERE a.status = 1 AND a.slug = '`+slug+`' LIMIT 1
  `, { type: QueryTypes.SELECT })

  if (!model) {
    res.status(400).send({
      message: "Article with id " + slug + " was not found.!!",
    });
    return;
  }

  res.status(200).send({
    data: model[0],
    status: true,
    message: "ok",
  });
  return;
}

async function comments(req, res) {
  User.hasMany(ArticleComment, { foreignKey: "userId" });
  ArticleComment.belongsTo(User, { foreignKey: "userId" });

  let relations = [
    {
      model: User,
      attributes: {
        exclude: ["updatedAt", "password", "resetToken", "confirmToken"],
      },
    },
  ];

  let commentTree = await buildTree(relations, req.params.id, null);

  res.status(200).send({
    data: commentTree,
    status: true,
    message: "ok",
  });
  return;
}

async function comment(req, res) {

  let article_id = req.params.id
  let user = await auth_user(req)

  if(!user){
    res.status(401).send({ message: "401 unauthorized invalid token" })
    return
  }

  let formData = {
    articleId: article_id,
    userId: user.id,
    comment: req.body.comment,
    status: 1,
    created_at: new Date(),
    updated_at: new Date()
  }

  let result = await ArticleComment.create(formData);

  res.status(200).send({
    data: result,
    status: true,
    message: "ok",
  });
  return;
}

async function buildTree(relations, article_id, parent_id) {
  var branch = [];
  var comments = await ArticleComment.findAll({
    include: relations,
    where: { articleId: article_id, parentId: parent_id },
    order: [["id", "desc"]],
  });

  await Promise.all(
    comments.map(async (comment) => {

      let obj = {
         "id": comment.id,
         "parentId": comment.parentId,
         "comment": comment.comment,
         "created_at": comment.createdAt,
         "user": comment.User
      }

      let children = await buildTree(relations, article_id, comment.id)
      
      if(children.length > 0){
        obj["children"] = children;
      }else{
        obj["children"] = [];
      }

      branch.push(obj);
    })
  );

  return branch;
}

module.exports = {
  list,
  detail,
  comments,
  comment,
};
