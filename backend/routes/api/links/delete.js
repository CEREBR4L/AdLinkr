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
};
