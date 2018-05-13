/**
 * AdLinkr
 * A URL shortening tool for digital marketers
 * https://github.com/jodylecompte/AdLinkr
 * License: MIT
 *
 * Written by Jody LeCompte <jody@jodylecompte.com
 * Website: https://jodylecompte.com
 */
const expect = require('chai').expect;
const utmParameterize = require('../../backend/helpers/utmParameterize');

const urlWithQueryString = 'https://google.com?test=test';
const urlWithoutQueryString = 'https:/google.com';
const queryString = 'utm_source=testSource&utm_campaign=testCampaign';
const sampleData = {
    utm_source: 'testSource',
    utm_campaign: 'testCampaign',
};

describe('Helper Functions: utmParameterize', () => {
    it('Should not alter URL if no UTM paramters are provided', () => {
        const testURL = utmParameterize(urlWithoutQueryString, {});
        expect(testURL).to.equal(urlWithoutQueryString);
    });

    it('Should begin with a ? if first in URL', () => {
        const testURL = utmParameterize(urlWithoutQueryString, sampleData);
        expect(testURL).to.equal(`${urlWithoutQueryString}?${queryString}`);
    });

    it('Should begin with & if not first in URL', () => {
        const testURL = utmParameterize(urlWithQueryString, sampleData);
        expect(testURL).to.equal(`${urlWithQueryString}&${queryString}`);
    });
});
