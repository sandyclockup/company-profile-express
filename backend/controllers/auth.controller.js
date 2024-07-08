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
const User = db.User;
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

async function login(req, res) {

    if (!req.body.email) {
        res.status(400).send({
            message: "The field email can not be empty!"
        });
        return;
    }

    if (!req.body.password) {
        res.status(400).send({
            message: "The field password can not be empty!"
        });
        return;
    }

    let email = req.body.email;
    let password = req.body.password;
    let user = await User.findOne({
        where: {
            email: email
        }
    });

    if (!user) {
        res.status(401).send({
            message: "These credentials do not match our records."
        });
        return;
    }

    if (!bcrypt.compareSync(password, user.password)) {
        res.status(401).send({
            message: "Wrong password!!"
        });
        return;
    }

    if (parseInt(user.status) === 0) {
        res.status(401).send({
            message: "You need to confirm your account. We have sent you an activation code, please check your email.!"
        });
        return;
    }

    let token = jwt.sign({
        sub: user.id
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d'
    });
    res.send({
        ...omitPassword(user),
        token
    });
    return;
}

async function register(req, res) {

    if (!req.body.email) {
        res.status(400).send({
            message: "The field email can not be empty!"
        });
        return;
    }

    if (!req.body.password) {
        res.status(400).send({
            message: "The field password can not be empty!"
        });
        return;
    }

    if (!req.body.password_confirm) {
        res.status(400).send({
            message: "The field password_confirm can not be empty!"
        });
        return;
    }

    let email = req.body.email;
    let password = req.body.password;
    let password_confirm = req.body.password_confirm;

    if (password.length < 8) {
        res.status(400).send({
            message: "The password must be at least 8 characters.!"
        });
        return;
    }

    if (password_confirm !== password) {
        res.status(400).send({
            message: "The password confirmation does not match.!"
        });
        return;
    }

    let findUserByEmail = await User.findOne({
        where: {
            email: email
        }
    });

    if (findUserByEmail) {
        res.status(400).send({
            message: "The email has already been taken.!"
        });
        return;
    }

    let confirmToken = btoa(bcrypt.hashSync(email, 10))
    let formUser = {
        email: email,
        password: bcrypt.hashSync(password, 10),
        confirmToken: confirmToken,
        status: 0,
        created_at: new Date(),
        updated_at: new Date()
    }

    let createUser = await User.create(formUser);

    res.status(200).send({
        data: {
            user: createUser,
            token: confirmToken
        },
        status: true,
        message: "You need to confirm your account. We have sent you an activation code, please check your email."
    });
    return;

}

async function confirm(req, res) {

    let token = req.params.token;
    let user = await User.findOne({
        where: {
            confirmToken: token,
            status: 0
        }
    });

    if (!user) {
        res.status(404).send({
            message: "We can't find a user with that  token is invalid.!"
        });
        return;
    }

    let formUpdate = {
        status: 1,
        confirmToken: null,
        updated_at: new Date()
    }

    await User.update(formUpdate, {
        where: {
            id: user.id
        }
    })

    res.status(200).send({
        data: {},
        status: true,
        message: "Your e-mail is verified. You can now login."
    });
    return;

}

async function forgotPassword(req, res) {

    if (!req.body.email) {
        res.status(400).send({
            message: "The field email can not be empty!"
        });
        return;
    }

    let email = req.body.email;
    let findUserByEmail = await User.findOne({
        where: {
            email: email
        }
    });

    if (!findUserByEmail) {
        res.status(400).send({
            message: "We can't find a user with that e-mail address."
        });
        return;
    }

    let resetToken = btoa(bcrypt.hashSync(email, 10))
    let formUpdate = {
        status: 1,
        resetToken: resetToken,
        updated_at: new Date()
    }

    let user = findUserByEmail

    await User.update(formUpdate, {
        where: {
            id: user.id
        }
    })

    res.status(200).send({
        data: resetToken,
        status: true,
        message: "We have e-mailed your password reset link!"
    });
    return;

}

async function resetPassword(req, res) {

    if (!req.body.email) {
        res.status(400).send({
            message: "The field email can not be empty!"
        });
        return;
    }

    if (!req.body.password) {
        res.status(400).send({
            message: "The field password can not be empty!"
        });
        return;
    }

    if (!req.body.password_confirm) {
        res.status(400).send({
            message: "The field password_confirm can not be empty!"
        });
        return;
    }

    let token = req.params.token;
    let email = req.body.email;
    let password = req.body.password;
    let password_confirm = req.body.password_confirm;


    if (password.length < 8) {
        res.status(400).send({
            message: "The password must be at least 8 characters.!"
        });
        return;
    }

    if (password_confirm !== password) {
        res.status(400).send({
            message: "The password confirmation does not match.!"
        });
        return;
    }

    let findUserByEmail = await User.findOne({
        where: {
            email: email,
            resetToken: token
        }
    });

    if (!findUserByEmail) {
        res.status(400).send({
            message: "We can't find a user with that e-mail address or password reset token is invalid."
        });
        return;
    }

    let formUpdate = {
        password: bcrypt.hashSync(password, 10),
        updated_at: new Date()
    }

    await User.update(formUpdate, {
        where: {
            email: email
        }
    })

    res.status(200).send({
        data: {},
        status: true,
        message: "Your password has been reset!"
    });
    return;

}

function omitPassword(user) {
    const {
        password,
        ...userWithoutPassword
    } = user;
    let result = userWithoutPassword;
    console.log(result)
}

module.exports = {
    login,
    register,
    confirm,
    forgotPassword,
    resetPassword
}