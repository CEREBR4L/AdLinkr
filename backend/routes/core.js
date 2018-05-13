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

const utmParameterize = require('../helpers/utmParameterize');
const Link = require('../models/Link');

router.get('/', (req, res) => {
    res.sendStatus(401).send('Unauthorized');
});

router.get('/:shortCode', (req, res) => {
    const shortCode = req.params.shortCode;

    Link.findOne({shortCode}).then((data) => {
        if (data) {
            res.redirect(utmParameterize(data.url, {
                utm_source: data.utmSource,
                utm_medium: data.utmMedium,
                utm_term: data.utmTerm,
                utm_content: data.utmContent,
                utm_campaign: data.utmCampaign,
            }));
        } else {
            res.sendStatus(404);
        }
    });
});

module.exports = router;
