/**
 * AdLinkr
 * A URL shortening tool for digital marketers
 * https://github.com/jodylecompte/AdLinkr
 * License: MIT
 *
 * Written by Jody LeCompte <jody@jodylecompte.com
 * Website: https://jodylecompte.com
 */

require('./db');

const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`AdLinkr server initalized.`);
});
