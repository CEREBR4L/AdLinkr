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

const Link = require('../../../backend/models/Link');

describe('Models:  Link', function() {
    it('should be invalid if URL is empty', () => {
        let link = new Link();

        link.validate((err) => {
            expect(err.errors.url).to.exist;
        });
    });

    it('should be invalid if shortcode is empty', () => {
        let link = new Link({url: 'https://google.com'});

        link.validate((err) => {
            expect(err.errors.shortCode).to.exist;
        });
    });

    it('should support all applicable UTM fields', () => {
        const link = new Link({
            shortcode: 'test',
            url: 'test',
            utmSource: 'Test',
            utmMedium: 'Test',
            utmTerm: 'Test',
            utmContent: 'Test',
            utmCampaign: 'Test',
        });

        expect(link.utmSource).to.equal('Test');
        expect(link.utmMedium).to.equal('Test');
        expect(link.utmTerm).to.equal('Test');
        expect(link.utmContent).to.equal('Test');
        expect(link.utmCampaign).to.equal('Test');
    });
});
