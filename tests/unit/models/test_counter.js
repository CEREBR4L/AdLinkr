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

const Counter = require('../../../backend/models/Counter');

describe('Models: Counter', function() {
    it('should be invalid if count is empty', () => {
        let counter = new Counter();

        counter.validate((err) => {
            expect(err.errors.count).to.exist;
        });
    });
});
