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
    req.checkParams('id', 'An ID must be provided.').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        return res.json(errorMessage(errors[0].msg));
    }

    const update = req.body.update;
    if (typeof update !== 'object') {
        return res.json(errorMessage('No changes provided'));
    }

    update['lastModifiedTimestamp'] = new Date().getTime();
    Link.findOneAndUpdate({_id: req.params.id},
        {$set: update},
        {new: true})
        .then((data) => {
            if (!data) {
                return res.json(errorMessage('Invalid ID.'));
            }

            res.json(successMessage('Edit successful.', 'Link', data));
        })
        .catch((err) => res.json(errorMessage(err.message)));
};
