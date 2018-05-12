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

const Link = require('../../models/Link');

router.post('/add', (req, res) => {
    req.checkBody('url', 'A URL must be provided.').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        return res.json({error: errors});
    }

    const currentTimestamp = new Date().getTime();
    const newLinkData = {
        url: 'https://google.com',
        utmSource: 'Test',
        utmMedium: 'Test',
        utmTerm: 'Test',
        utmContent: 'Test',
        utmCampaign: 'Test',
        createdTimestamp: currentTimestamp,
        lastModifiedTimestamp: currentTimestamp,
    };

    Link.createLink(newLinkData, (err, data) => {
        if (err) {
            return res.json({'error': err});
        }

        return res.json(data);
    });
});

router.get('/delete/:id*?', (req, res) => {
    if (!req.params.id) {
        return res.json({
            'error': 'Please ensure link ID is provided.',
        });
    }

    Link.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return res.json({'error': err});
        }

        res.json({
            'success': `Link with shortcode "${data.shortcode}" deleted`,
        });
    });
});

module.exports = router;
