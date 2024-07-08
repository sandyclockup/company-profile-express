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

const appRouter = require('express').Router();
const accountController = require("../controllers/account.controller.js");
const articleController = require("../controllers/article.controller.js");
const authController = require("../controllers/auth.controller.js");
const pageController = require("../controllers/page.controller.js");
const portfolioController = require("../controllers/portfolio.controller.js");
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})

const upload = multer({
    storage: storage
});

// Account Management
appRouter.get('/account/detail', accountController.detail);
appRouter.post('/account/upload', upload.single('file_image'), accountController.upload);
appRouter.post('/account/update', accountController.update);
appRouter.post('/account/password', accountController.password);

// Article Pages
appRouter.get('/article/list', articleController.list);
appRouter.get('/article/detail/:slug', articleController.detail);
appRouter.get('/article/comments/:id', articleController.comments);
appRouter.post('/article/comment/:id', articleController.comment);

// Auth Pages
appRouter.post('/auth/login', authController.login);
appRouter.post('/auth/register', authController.register);
appRouter.get('/auth/confirm/:token', authController.confirm);
appRouter.post('/auth/email/forgot', authController.forgotPassword);
appRouter.post('/auth/email/reset/:token', authController.resetPassword);

// General Pages
appRouter.get('/page/ping', pageController.ping);
appRouter.get('/page/home', pageController.home);
appRouter.get('/page/about', pageController.about);
appRouter.get('/page/service', pageController.service);
appRouter.get('/page/faq', pageController.faq);
appRouter.get('/page/contact', pageController.contact);
appRouter.post('/page/message', pageController.message);
appRouter.post('/page/subscribe', pageController.subscribe);

// Portfolio Pages
appRouter.get('/portfolio/list', portfolioController.list);
appRouter.get('/portfolio/detail/:id', portfolioController.detail);
module.exports = app => {
    app.use('/api', [appRouter]);
};