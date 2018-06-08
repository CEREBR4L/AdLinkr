/**
 * AdLinkr
 * A URL shortening tool for digital marketers
 * https://github.com/jodylecompte/AdLinkr
 * License: MIT
 *
 * Written by Jody LeCompte <jody@jodylecompte.com
 * Website: https://jodylecompte.com
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../../../config/config');
const User = require('../../../models/User');
const {
    errorMessage,
    successMessage,
} = require('../../../services/ResponseService');

module.exports = (req, res) => {
    req.checkBody('username', 'A username must be provided.').notEmpty();
    req.checkBody('password', 'A password must be provided.').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        return res.json(errorMessage(errors[0].msg));
    }

    User.findOne({email: req.body.username}, (err, data) => {
            if (err) {
                return res.json(errorMessage(err));
            }

            if (!data) {
                return res.json(errorMessage('Invalid username.'));
            }

            if (bcrypt.compareSync(req.body.password, data.password)) {
                const refreshToken = Math.random().toString(36).substr(1, 10);
                const token = jwt.sign({
                    expiresIn: '8h',
                    data: {
                        userId: data._id,
                        refreshToken,
                    },
                }, config.auth.secret);

                data.refreshToken = refreshToken;
                data.save((err, data) => {
                    if (err) {
                        return res.json(errorMessage(err));
                    }

                    delete(data.password);
                    const returnData = {
                        user: data,
                        token,
                    };

                    return res.json(
                        successMessage('Logged in', 'User Token', returnData));
                });
            } else {
                return res.json(errorMessage('Invalid password.'));
            }
        });
};
