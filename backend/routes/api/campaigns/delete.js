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
    if (!req.params.id) {
        return res.json({
            'error': 'Please ensure campaign ID is provided.',
        });
    }

    Campaign.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return res.json({'error': err});
        }

        res.json({'success': `Campaign "${data.name}" deleted`});
    });
};
