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

const Counter = require('../models/Counter');
const encodeLinkId = require('../helpers/encodeLinkId');

const linkSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    shortCode: {
        type: String,
        required: true,
        unique: true,
    },
    utmSource: {type: String},
    utmMedium: {type: String},
    utmTerm: {type: String},
    utmContent: {type: String},
    utmCampaign: {type: String},
    createdTimestamp: {type: Number},
    lastModifiedTimestamp: {type: Number},
});

linkSchema.statics.checkUniqueCode = function(code, callback) {
    this.find({shortCode: code}).then((data) => {
        callback(data.length === 0);
    });
};

linkSchema.statics.createLink = function(linkData, callback) {
    Counter.nextId('link', (id) => {
        const currentTimestamp = new Date().getTime();
        const newLink = new this(linkData);

        if (linkData.hasOwnProperty('shortCode')) {
            newLink.shortCode = linkData['shortCode'];
        } else {
            newLink.shortCode = encodeLinkId(id);
        }

        this.checkUniqueCode(newLink.shortCode, (data) => {
            if (!data) {
                return callback('ShortCode already exists', null);
            } else {
                newLink._id = id;
                newLink.createdTimestamp = currentTimestamp;
                newLink.lastModifiedTimestamp = currentTimestamp;
                newLink.save(callback);
            }
        });
    });
};

module.exports = mongoose.model('Link', linkSchema);
