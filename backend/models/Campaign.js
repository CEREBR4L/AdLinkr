/**
 * AdLinkr
 * A URL shortening tool for digital marketers
 * https://github.com/jodylecompte/AdLinkr
 * License: MIT
 *
 * Written by Jody LeCompte <jody@jodylecompte.com
 * Website: https://jodylecompte.com
 */

const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    createdTimestamp: {
        type: Number,
        required: true,
    },
    lastModifiedTimestamp: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Campaign', campaignSchema);
