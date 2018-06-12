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
const bcrypt = require('bcryptjs');
const validEmailRx = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                // Regex pattern by Bryan Anderson (@dreamstarter)
                return validEmailRx.test(v);
            },
            message: '{VALUE} is not a valid email address.',
        },
    },
    password: {
        type: String,
        required: true,
    },
    groupId: {
        type: String,
        required: true,
    },
    forgotPasswordCode: {type: String},
    forgotPasswordTime: {type: Number},
    activationCode: {type: Number},
    createdTimestamp: {type: Number},
    lastModifiedTimestamp: {type: Number},
    refreshToken: {type: String},
});

userSchema.statics.createUser = function(userData, callback) {
    const newUser = new this(userData);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newUser.password, salt);
    const currentTimestamp = new Date().getTime();

    newUser.password = hash;
    newUser.currentTimestamp = currentTimestamp;
    newUser.lastModifiedTimestamp = currentTimestamp;

    newUser.save()
        .then((data) => callback(null, data))
        .catch((e) => callback(e.message, null));
};

module.exports = mongoose.model('User', userSchema);
