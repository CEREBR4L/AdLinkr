/**
 * AdLinkr
 * A URL shortening tool for digital marketers
 * https://github.com/jodylecompte/AdLinkr
 * License: MIT
 *
 * Written by Jody LeCompte <jody@jodylecompte.com
 * Website: https://jodylecompte.com
 */
let expect = require('chai').expect;

const Link = require('../../backend/models/Link');
const seed = require('../seeds/link.seed');

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
        });

        expect(link.utmSource).to.equal('Test');
        expect(link.utmMedium).to.equal('Test');
        expect(link.utmTerm).to.equal('Test');
        expect(link.utmContent).to.equal('Test');
    });
    describe('Methods: ', () => {
        beforeEach(function(done) {
            Link.remove({}).then(() => {
                return Link.insertMany(seed);
              }).then(() => done());
        });

        describe('createLink()', () => {
            it('should createa an incremental numeric ID', (done) => {
                Link.find({}).then((data) => {
                    data.forEach((record) => {
                       expect(record._id).to.be.a('number');
                    });
                    done();
                });
            });

            it('Should generate a short code from the ID', (done) => {
                const linkData = {
                    url: 'test',
                    utmSource: 'Test',
                    utmMedium: 'Test',
                    utmTerm: 'Test',
                    utmContent: 'Test',
                };

                Link.createLink(linkData, (err, data) => {
                    expect(data.shortCode).to.not.be.a('number');
                    done();
                });
            });

            it('should save a record with valid input', (done) => {
                const linkData = {
                    url: 'www.yahoo.com',
                    utmSource: 'Test',
                    utmMedium: 'Test',
                    utmTerm: 'Test',
                    utmContent: 'Test',
                };

                Link.createLink(linkData, (err, data) => {
                    expect(data.url).to.equal(linkData.url);
                    done();
                });
            });
        });

        describe('checkUniqueCode()', () => {
            it('should return true with new link code', (done) => {
                Link.checkUniqueCode('newCode', (res) => {
                    expect(res).to.be.true;
                    done();
                });
            });

            it('should return true with new link code', (done) => {
                Link.checkUniqueCode('goodCode', (res) => {
                    expect(res).to.be.false;
                    done();
                });
            });
        });
    });
});
