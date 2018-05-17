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
    Campaign.find({}, (err, data) => {
        if (err) {
            return res.send(errorMessage('Error loading data' + err));
        }

        return res.send(successMessage('Data loaded successfully', 'Campaign', {
            data,
        }));
    });
};
