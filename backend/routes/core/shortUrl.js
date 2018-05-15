const utmParameterize = require('../../helpers/utmParameterize');
const Link = require('../../models/Link');

module.exports = (req, res) => {
    const shortCode = req.params.shortCode;

    Link.findOne({shortCode}).then((data) => {
        if (data) {
            res.redirect(utmParameterize(data.url, data));
        } else {
            res.sendStatus(404);
        }
    });
};
