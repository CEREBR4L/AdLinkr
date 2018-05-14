/**
 * AdLinkr
 * A URL shortening tool for digital marketers
 * https://github.com/jodylecompte/AdLinkr
 * License: MIT
 *
 * Written by Jody LeCompte <jody@jodylecompte.com
 * Website: https://jodylecompte.com
 */

const utmParameterize = (url, data) => {
    const paramsArray = [];
    const parameters = {
        utm_source: data.utmSource,
        utm_medium: data.utmMedium,
        utm_term: data.utmTerm,
        utm_content: data.utmContent,
        utm_campaign: data.utmCampaign,
    };

    for (let key in parameters) {
        if (parameters[key]) {
            paramsArray.push(`${key}=${parameters[key]}`);
        }
    }

    if (paramsArray.length === 0) {
        return url;
    }

    let final = paramsArray.join('&');
    let firstCharacter = '?';

    if (url.includes('?')) {
        firstCharacter = '&';
    }

    return `${url}${firstCharacter}${final}`;
};

module.exports = utmParameterize;
