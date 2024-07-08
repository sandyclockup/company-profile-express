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

const jwt = require('jsonwebtoken');
const db = require("../models");
const User = db.User;

async function auth_user(req) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        var user_id;
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, process.env.JWT_SECRET_KEY, (err, authData) => {
            if (err) {
                console.log(err);
            }
            if (authData["sub"]) {
                user_id = authData["sub"]
            }
        })
        return await User.findOne({
            where: {
                id: user_id
            }
        })
    }
    return undefined
}

module.exports = auth_user