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
const encodeLinkId = require('../../backend/helpers/encodeLinkId');

describe('Helper Functions: encodeLinkId', function() {
    it('should encode a numeric ID into a mixed-string', () => {
        const encodedValue = encodeLinkId(5);

        expect(encodedValue).to.not.equal('5');
    });

    it('should not produce duplicates', () => {
        const values = new Set();

        for (let x = 10000; x < 20000; x++) {
            values.add(encodeLinkId(x));
        }

        expect(values.size).to.equal(10000);
    });

    it('should throw an error on invalid input', () => {
        const expected = encodeLinkId.bind('encodeLinkId', 'a string');
        expect(expected).to.throw('Input must be a number');
    });
});
