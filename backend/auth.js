/**
 * AdLinkr
 * A URL shortening tool for digital marketers
 * https://github.com/jodylecompte/AdLinkr
 * License: MIT
 *
 * Written by Jody LeCompte <jody@jodylecompte.com
 * Website: https://jodylecompte.com
 */

const jwt = require('jsonwebtoken');

const config = require('./config/config');
const {errorMessage} = require('./services/ResponseService');
const User = require('./models/User');

module.exports = (req, res, next) => {
    const errorMsg = errorMessage('Unauthorized');
    const token = req.header('x-access-token');

    if (!req.originalUrl.includes('api')) {
        return next();
    }

    if (req.originalUrl === '/api/auth/login' || req.originalUrl === '/api/auth/register') {
        return next();
    }

    if (!token) {
        return res.json(errorMsg);
    }

    jwt.verify(token, config.auth.secret, function(err, decoded) {
        if (err) {
            return res.json(errorMsg);
        }

        User.findOne({refreshToken: decoded.refreshToken})
            .then((user) => {
                return next();
            })
            .catch((err) => req.json(errorMessage(err)));
    });
};
