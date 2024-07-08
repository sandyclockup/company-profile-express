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
const Portfolio = db.Portfolio;
const PortfolioImage = db.PortfolioImage;
const Customer = db.Customer;

async function list(req, res) {
  Customer.hasMany(Portfolio, { foreignKey: "customerId" });
  Portfolio.belongsTo(Customer, { foreignKey: "customerId" });

  res.status(200).send({
    data: {
      portfolios: await Portfolio.findAll({
        include: [
          {
            model: Customer,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        where: { status: 1 },
        order: [["sort", "asc"]],
      }),
    },
    status: true,
    message: "ok",
  });
  return;
}

async function detail(req, res) {
  let id = req.params.id;

  Customer.hasMany(Portfolio, { foreignKey: "customerId" });
  Portfolio.belongsTo(Customer, { foreignKey: "customerId" });

  let model = await Portfolio.findOne({
    include: [
      {
        model: Customer,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
    where: { id: id },
  });

  if (!model) {
    res.status(400).send({
      message: "Record with id " + id + " was not found.!!",
    });
    return;
  }

  let images = await PortfolioImage.findAll({
    where: { portfolio_id: id },
    order: [["id", "desc"]],
  });

  let data = {
    portfolio: model,
    images: images,
  };

  res.status(200).send({
    data: data,
    status: true,
    message: "ok",
  });
  return;
}

module.exports = {
  list,
  detail,
};
