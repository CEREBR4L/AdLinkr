/**
 * AdLinkr
 * A URL shortening tool for digital marketers
 * https://github.com/jodylecompte/AdLinkr
 * License: MIT
 *
 * Written by Jody LeCompte <jody@jodylecompte.com
 * Website: https://jodylecompte.com
 */

const Campaign = require('../../../models/Campaign');

module.exports = (req, res) => {
    if (!req.body.hasOwnProperty('campaignName')) {
        return res.json({
            'error': 'Please ensure campaign name is not empty is a string.',
        });
    }

    const currentTimestamp = new Date().getTime();
    const newCampaignData = {
        name: req.body.campaignName,
        createdTimestamp: currentTimestamp,
        lastModifiedTimestamp: currentTimestamp,
    };

    const newCampaign = new Campaign(newCampaignData);
    newCampaign.save((err, data) => {
        if (err) {
            res.json({'error': err});
            return;
        }

        res.json(data);
        return;
    });
};
