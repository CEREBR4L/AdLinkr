/**
 * AdLinkr
 * A URL shortening tool for digital marketers
 * https://github.com/jodylecompte/AdLinkr
 * License: MIT
 *
 * Written by Jody LeCompte <jody@jodylecompte.com
 * Website: https://jodylecompte.com
 */

const encodeLinkId = (i) => {
    if (typeof i !== 'number') {
        throw new Error('Input must be a number');
    }

    const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeric = '0123456789';
    const seed = [...alpha].concat(numeric);

    const base = seed.length;
    let final = [];

    if (i == 0) {
        return seed[0];
    }

    while (i > 0) {
        final.push(seed[i % base]);
        i = parseInt(i / base, 10);
    }

    return final.reverse().join('');
};

module.exports = encodeLinkId;
