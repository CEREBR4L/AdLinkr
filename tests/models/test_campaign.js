/**
 * AdLinkr
 * A URL shortening tool for digital marketers
 * https://github.com/jodylecompte/AdLinkr
 * License: MIT
 *
 * Written by Jody LeCompte <jody@jodylecompte.com
 * Website: https://jodylecompte.com
 */

const Campaign = require('../../backend/models/Campaign');
let expect = require('chai').expect;

describe('Models: Campaigns', function() {
    it('should be invalid if required fields are empty', () => {
        let campaign = new Campaign();

        campaign.validate((err) => {
            expect(err.errors.name).to.exist;
            expect(err.errors.createdTimestamp).to.exist;
            expect(err.errors.lastModifiedTimestamp).to.exist;
        });
    });
});
