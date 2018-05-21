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
const {
    errorMessage,
    successMessage,
} = require('../../../services/ResponseService');

module.exports = (req, res) => {
    req.checkBody('url', 'A URL must be provided.').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        return res.json(errorMessage(errors[0].msg));
    }

    const currentTimestamp = new Date().getTime();
    const newLinkData = {
        url: req.body.url,
        utmSource: req.body.utmSource || null,
        utmMedium: req.body.utmMedium || null,
        utmTerm: req.body.utmTerm || null,
        utmContent: req.body.utmContent || null,
        utmCampaign: req.body.utmCampaign || null,
        createdTimestamp: currentTimestamp,
        lastModifiedTimestamp: currentTimestamp,
    };

    if (req.body.shortCode) {
        newLinkData.shortCode = req.body.shortCode;
    }

    Link.createLink(newLinkData, (err, data) => {
        if (err) {
            return res.json(errorMessage(err));
        }

        return res.json(successMessage('Campaign Added', 'Campaign', {
            url: data.url,
            shortCode: data.shortCode,
            createdTimestamp: data.createdTimestamp,
            lastModifiedTimestamp: data.lastModifiedTimestamp,
        }));
    });
};
