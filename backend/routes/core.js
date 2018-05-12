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

const Link = require('../models/Link');

router.get('/', (req, res) => {
    res.sendStatus(200);
});

router.get('/:shortCode', (req, res) => {
    const shortCode = req.params.shortCode;

    Link.find({shortCode}).then((data) => {
        if (data.length > 0) {
            res.redirect(data.url);
        } else {
            res.sendStatus(404);
        }
    });
});


module.exports = router;
