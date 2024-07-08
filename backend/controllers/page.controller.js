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

const faker = require("faker");
const db = require("../models");
const { Sequelize, Op, QueryTypes } = require("sequelize");
const Slider = db.Slider
const Service = db.Service
const Testimonial = db.Testimonial
const Article = db.Article
const Team = db.Team
const Customer = db.Customer
const Faq = db.Faq
const Contact = db.Contact

async function ping(req, res) {
    res.status(200).send({
        data: null,
        status: true,
        message: "ok"
    });
    return;
}

async function home(req, res) {

    Customer.hasMany(Testimonial, {foreignKey: 'customer_id'})

    Testimonial.belongsTo(Customer, {foreignKey: 'customer_id'})

    let articles = await db.sequelize.query(`
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
        WHERE a.status = 1 ORDER BY RAND() LIMIT 3 
    `, { type: QueryTypes.SELECT })

    let data = {
        "header": {
            "title": faker.lorem.sentences(5),
            "description": faker.lorem.sentences(20)
        },
        "sliders": await Slider.findAll({
            where: { status: 1 },
            order: [['sort', 'asc']] 
        }),
        "services": await Service.findAll({
            where: { status: 1 },
            limit: 4,
            order: [Sequelize.literal("RAND()")],
        }),
        "testimonial": await Testimonial.findOne({
            include: [{
                model: Customer
            }],
            where: { status: 1 },
            order: [Sequelize.literal("RAND()")],
        }),
        "articles": articles
    }

    res.status(200).send({
        data: data,
        status: true,
        message: "ok"
    });
    return;
}

async function about(req, res) {

    let data = {
        "header": {
            "title": faker.lorem.sentences(5),
            "description": faker.lorem.sentences(20)
        },
        "section1": {
            "title": faker.lorem.sentences(5),
            "description": faker.lorem.paragraphs(2)
        },
        "section2": {
            "title": faker.lorem.sentences(5),
            "description": faker.lorem.paragraphs(2)
        },
        "teams": await Team.findAll({
            where: { status: 1 },
            order: [['sort', 'asc']] 
        }),
    }

    res.status(200).send({
        data: data,
        status: true,
        message: "ok"
    });
    return;
}

async function service(req, res) {

    let data = {
        "header": {
            "title": faker.lorem.sentences(5),
            "description": faker.lorem.sentences(20)
        },
        "services": await Service.findAll({
            where: { status: 1 },
            order: [Sequelize.literal("RAND()")],
        }),
        "customers": await Customer.findAll({
            where: { status: 1 },
            order: [Sequelize.literal("RAND()")],
        }),
        "testimonials": await Testimonial.findAll({
            where: { status: 1 },
            order: [Sequelize.literal("RAND()")],
        })
    }

    res.status(200).send({
        data: data,
        status: true,
        message: "ok"
    });
    return;
}

async function faq(req, res) {

    let data = {
        "faq1": await Faq.findAll({
            where: { status: 1, sort: {
                [Op.lte]: 5,
            }},
            order: [Sequelize.literal("RAND()")],
        }),
        "faq2": await Faq.findAll({
            where: { status: 1, sort: {
                [Op.gt]: 5,
            }},
            order: [Sequelize.literal("RAND()")],
        })
    }

    res.status(200).send({
        data: data,
        status: true,
        message: "ok"
    });
    return;
}

async function contact(req, res) {
    res.status(200).send({
        data: {
            "services": await Service.findAll({
                where: { status: 1 },
                limit: 4,
                order: [Sequelize.literal("RAND()")],
            })
        },
        status: true,
        message: "ok"
    });
    return;
}

async function message(req, res) {

    if (!req.body.name) {
        res.status(400).send({
            message: "The field name can not be empty!"
        });
        return;
    }

    if (!req.body.email) {
        res.status(400).send({
            message: "The field email can not be empty!"
        });
        return;
    }

    if (!req.body.subject) {
        res.status(400).send({
            message: "The field subject can not be empty!"
        });
        return;
    }

    if (!req.body.message) {
        res.status(400).send({
            message: "The field message can not be empty!"
        });
        return;
    }

    let contactData = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
        status: 0,
        created_at: new Date(),
        updated_at: new Date()
    }

    await Contact.create(contactData);

    res.status(200).send({
        data: contactData,
        status: true,
        message: "ok"
    });
    return;
}

async function subscribe(req, res) {

    

    if (!req.body.email) {
        res.status(400).send({
            message: "The field email can not be empty!"
        });
        return;
    }

    res.status(200).send({
        data: null,
        status: true,
        message: "ok"
    });
    return;
}

module.exports = {
    ping,
    home,
    about,
    service,
    faq,
    contact,
    message,
    subscribe
}