const Link = require('../../app/models/Link');
var expect = require('chai').expect;

describe('Links Model', function() {
    it('should be invalid if URL is empty', () => {
        var link = new Link();

        link.validate(err => {
            expect(err.errors.url).to.exist;
        });
    });

    it('should be invalid if shortcode is empty', () => {
        var link = new Link({url: "https://google.com"});

        link.validate(err => {
            expect(err.errors.shortcode).to.exist;
        });
    });

    it('should support all applicable UTM fields', () => {
        const link = new Link({
            shortcode: "test", 
            url: "test",
            utmSource: "Test",
            utmMedium: "Test",
            utmTerm: "Test",
            utmContent: "Test"
        });

        expect(link.utmSource).to.equal("Test")
        expect(link.utmMedium).to.equal("Test")
        expect(link.utmTerm).to.equal("Test")
        expect(link.utmContent).to.equal("Test")
    });
});