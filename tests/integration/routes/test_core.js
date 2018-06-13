/**
 * AdLinkr
 * A URL shortening tool for digital marketers
 * https://github.com/jodylecompte/AdLinkr
 * License: MIT
 *
 * Written by Jody LeCompte <jody@jodylecompte.com
 * Website: https://jodylecompte.com
 */

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../../backend/app');
const Link = require('../../../backend/models/Link');
const seed = require('../../seeds/link.seed');

describe.only('Routes: Core', () => {
    beforeEach((done) => {
        Link.remove({}).then(() => {
            Link.insertMany(seed, (err, data) => {
                if (!err) {
                    done();
                }
            });
        });
    });

    it('Should return an error on invalid route', (done) => {
        request(app)
            .get('/fw')
            .expect((data) => {
                expect(data).to.haveOwnProperty('error');
            })
            .end(done);
    });

    it('Should redirect on a valid URL', (done) => {
        request(app)
            .get('/goodCode')
            .expect(302, done);
    });

    it('Should increase the click count of valid link', (done) => {
        request(app)
            .get('/goodCode')
            .expect((data) => {
                Link.findOne({shortCode: 'goodCode'}, (err, data) => {
                    expect(data.clickCount).to.equal(1);
                });
            })
            .end(done);
    });
});
