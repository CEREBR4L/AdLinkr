/**
 * AdLinkr
 * A URL shortening tool for digital marketers
 * https://github.com/jodylecompte/AdLinkr
 * License: MIT
 *
 * Written by Jody LeCompte <jody@jodylecompte.com
 * Website: https://jodylecompte.com
 */

const Link = require('../../../models/Link');

module.exports = (req, res) => {
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
};
