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

const counterSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
});

counterSchema.statics.nextId = function(type, callback) {
    this.findOne({_id: type}).then((data) => {
        const conditions = {_id: type};
        const update = {$inc: {count: 1}};
        this.update(conditions, update, {multi: true}, (err, numRows) => {
            if (numRows === 0) {
                throw new Error('Could not update counter');
            }

            callback(data.count);
        });
    });
};

module.exports = mongoose.model('Counter', counterSchema);
