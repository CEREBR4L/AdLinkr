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
const {app} = require('../app/server');

describe('Express', () => {
    it('Should start an express app and serve status code 200 on root request',
    (done) => {
        request(app)
            .get('/')
            .expect(200, done);
    });

    it('Should respond to valid asset requests served from static directory',
    (done) => {
        request(app)
            .get('/public/fixture.json')
            .expect(200, done);
    });

    it('Should return a 404 status code on invalid asset request', (done) => {
        request(app)
            .get('/public/jerrywasaracecardriver')
            .expect(404, done);
    });
});
