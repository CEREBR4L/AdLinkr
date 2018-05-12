/**
 * AdLinkr
 * A URL shortening tool for digital marketers
 * https://github.com/jodylecompte/AdLinkr
 * License: MIT
 *
 * Written by Jody LeCompte <jody@jodylecompte.com
 * Website: https://jodylecompte.com
 */

const express = require('express');
const router = new express.Router();

const User = require('../../models/User');

router.post('/register', (req, res) => {
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
        return res.json(data);
    });
});

router.get('/delete/:id*?', (req, res) => {
    if (!req.params.id) {
        return res.json({
            'error': 'Please ensure user ID is provided.',
        });
    }

    User.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return res.json({'error': err});
        }

        res.json({'success': `User "${data.firstName} ${data.lastName}" deleted`});
    });
});

module.exports = router;
