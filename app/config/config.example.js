/**
 * AdLinkr
 * A URL shortening tool for digital marketers
 * https://github.com/jodylecompte/AdLinkr
 * License: MIT
 *
 * Written by Jody LeCompte <jody@jodylecompte.com
 * Website: https://jodylecompte.com
 */

module.exports = {
  db: {
    development: 'mongodb://localhost/AdLinkrDev',
    production: 'mongodb://localhost/AdLinker',
  },
  auth: {
    secret: 'your key here',
    expirationTime: 600,
  },
};
