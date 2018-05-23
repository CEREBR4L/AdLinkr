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
const {
    errorMessage,
    successMessage,
} = require('../../../services/ResponseService');

module.exports = (req, res) => {
    if (!req.params.id) {
        return res.json(errorMessage('Please provide valid campaign ID.'));
    }

    Campaign.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return res.json(errorMessage(err));
        }

        if (err) {
            return res.json(errorMessage('ID is invalid.'));
        }

        res.json(successMessage('Campaign deleted', 'Campaign', data));
    });
};
