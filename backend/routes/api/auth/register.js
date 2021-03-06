/**
 * AdLinkr
 * A URL shortening tool for digital marketers
 * https://github.com/jodylecompte/AdLinkr
 * License: MIT
 *
 * Written by Jody LeCompte <jody@jodylecompte.com
 * Website: https://jodylecompte.com
 */

const User = require('../../../models/User');
const {successMessage, errorMessage} = require('../../../services/ResponseService');


module.exports = (req, res) => {
    req.checkBody('firstName', 'First Name is required').notEmpty();
    req.checkBody('lastName', 'Last Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('groupId', 'group ID is required').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        return res.json({error: errors});
    }

    const newUserData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        groupId: req.body.groupId,
    };

    User.createUser(newUserData, (err, data) => {
        if (err) {
            if (err.includes('dup key')) {
                return res.json(errorMessage('Email is already registered.'));
            } else {
                return res.json(errorMessage(err));
            }
        }

        return res.json(successMessage('User registered', 'user', data));
    });
};
