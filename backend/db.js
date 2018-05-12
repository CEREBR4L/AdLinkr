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

const config = require('./config/config');

let env;
if (arguments[1]['main']['filename'].match(/mocha/)) {
    env = 'dev';
}

if (env === 'dev') {
    mongoose.connect(config.db.development);
} else {
    mongoose.connect(config.db.production);
}
