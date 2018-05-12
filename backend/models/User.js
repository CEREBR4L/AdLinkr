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
});

userSchema.statics.checkUnique = function(email, callback) {
    this.find({email}).then((data) => {
        callback(data.length === 0);
    });
};

userSchema.statics.createUser = function(userData, callback) {
    this.checkUnique(userData.email, (data) => {
        if (!data) {
            return callback('Email already exists', null);
        }

        const newUser = new this(userData);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newUser.password, salt);
        
        newUser.password = hash;
        newUser.save().then((data) => {
            callback(null, data);
        });
    });
};

module.exports = mongoose.model('User', userSchema);
