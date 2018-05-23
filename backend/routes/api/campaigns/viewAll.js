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
    let conditions = {};

    Campaign.count({}, (err, count) => {
        if (err) {
            return res.json(errorMessage(err));
        }

        if (count === 0) {
            return res.json(errorMessage('No results'));
        }
        let pageNumber = req.query.pageNumber || 1;

        Campaign.find(conditions)
            .limit(25)
            .skip((pageNumber - 1) * 25)
            .exec((err, data) => {
                if (err) {
                    return res.json(errorMessage(err));
                }

                let pagination = {};

                if (count > 25) {
                    let pages = Math.floor(count / 25);
                    let viewingMinimum = (pageNumber * 25) - 24;
                    let viewingMaximum = pageNumber * 25;

                    if (count < viewingMaximum) {
                        viewingMaximum = count;
                    }

                    if (count % 25 !== 0) {
                        pages++;
                    }

                    if ((pageNumber - 1) * 25 + 1 > count) {
                        return res.json(errorMessage('Invalid page number'));
                    }

                    pagination['currentPage'] = pageNumber;
                    pagination['totalRows'] = count;
                    pagination['totalPages'] = pages;
                    pagination['viewing'] =
                        `${viewingMinimum} - ${viewingMaximum} of ${count}`;
                } else {
                    pagination = null;
                }

                const response = successMessage('Load successful', 'Links', {
                    data: data,
                    pagination: pagination,
                });

                res.json(response);
            });
    });
};
