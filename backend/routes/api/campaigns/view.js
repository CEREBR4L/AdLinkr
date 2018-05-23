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
    req.checkParams('id', 'An ID must be provided.').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        return res.json(errorMessage(errors[0].msg));
    }

    Campaign.findOne({_id: req.params.id}, (err, data) => {
        if (!data) {
            return res.json(errorMessage('Invalid ID.'));
        }

        if (err) {
            return res.json(errorMessage(err));
        }

        const response = successMessage('Successful Load', 'Campaign', {data});
        res.json(response);
    });
};
