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
