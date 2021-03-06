/**
 * AdLinkr
 * A URL shortening tool for digital marketers
 * https://github.com/jodylecompte/AdLinkr
 * License: MIT
 *
 * Written by Jody LeCompte <jody@jodylecompte.com
 * Website: https://jodylecompte.com
 */

const User = require('../../../models/User');

module.exports = (req, res) => {
    if (!req.params.id) {
        return res.json({
            'error': 'Please ensure user ID is provided.',
        });
    }

    User.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return res.json({'error': err});
        }

        res.json({
            'success': `User "${data.firstName} ${data.lastName}" deleted`,
        });
    });
};
