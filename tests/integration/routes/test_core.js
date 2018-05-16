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

const app = require('../../../backend/app');
const Link = require('../../../backend/models/Link');
const seed = require('../../seeds/link.seed');

describe('Routes: Core', () => {
    it('Should return an error on invalid route', (done) => {
        request(app)
            .get('/fw')
            .expect(404, done);
    });

    it('Should redirect on a valid URL', (done) => {
        Link.remove({}).then(() => {
            Link.insertMany(seed, (err, data) => {
                request(app)
                .get('/goodCode')
                .expect(302, done);
            });
        });
    });
});
