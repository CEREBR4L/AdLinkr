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

describe('Routes: API', () => {
    it('Should serve JSON for valid API routes', (done) => {
        request(app)
            .get('/api')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('Should return an error on invalid endpoints', (done) => {
        request(app)
            .get('/api/egaega')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect({'error': 'Invalid endpoint.'}, done);
    });
});
