/**
 * AdLinkr
 * A URL shortening tool for digital marketers
 * https://github.com/jodylecompte/AdLinkr
 * License: MIT
 *
 * Written by Jody LeCompte <jody@jodylecompte.com
 * Website: https://jodylecompte.com
 */

const utmParameterize = require('../../helpers/utmParameterize');
const Link = require('../../models/Link');

module.exports = (req, res) => {
    const shortCode = req.params.shortCode;

    Link.findOneAndUpdate({shortCode}, {$inc: {clickCount: 1}})
        .then((data) => {
            if (data) {
                res.redirect(utmParameterize(data.url, data));
            } else {
                res.sendStatus(404);
            }
        });
};
