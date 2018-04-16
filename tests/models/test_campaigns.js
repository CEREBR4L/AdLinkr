const Campaign = require('../../app/models/Campaign');
var expect = require('chai').expect;

describe('Campagins Model', function() {
    it('should be invalid if name is empty', () => {
        var campaign = new Campaign();

        campaign.validate(err => {
            expect(err.errors.name).to.exist;
        });
    });
});