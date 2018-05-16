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
const mongoose = require('mongoose');

const Link = require('../../../../backend/models/Link');
const app = require('../../../../backend/app');

after(() => {
    mongoose.connection.close();
});

describe('/links/ API Endpoints', () => {
    describe('POST links/add', () => {
        it('Should add a new link with valid input', (done) => {
        request(app)
            .post('/api/links/add')
            .send({
                url: 'https://google.com',
                utmSource: 'Test',
                utmMedium: 'Test',
                utmTerm: 'Test',
                utmContent: 'Test',
                utmCampaign: 'Test',
            })
            .expect((res) => {
                expect(res.body.url).to.equal('https://google.com');
                expect(res.body.createdTimestamp)
                    .to.equal(res.body.lastModifiedTimestamp);
            })
            .end(done);
        });

        it('Should fail to add a new link without valid input', (done) => {
            request(app)
                .post('/api/links/add')
                .expect((res) => {
                    expect(res.body).haveOwnProperty('error');
                })
                .end(done);
        });
    });

    describe('GET links/delete/:id', () => {
        it('Should delete link when given valid ID', (done) => {
            const testLink = new Link({
                url: 'https://google.com',
                utmSource: 'Test',
                utmMedium: 'Test',
                utmTerm: 'Test',
                utmContent: 'Test',
            });

            Link.createLink(testLink, (err, data) => {
                request(app)
                    .get(`/api/links/delete/${data.id}`)
                    .expect((res) => {
                        expect(res.body).to.haveOwnProperty('success');
                    })
                    .end(done);
            });
        });

        it('Should error out if ID is not provided.', (done) => {
            request(app)
                .get(`/api/links/delete/`)
                .expect((res) => {
                    expect(res.body.error)
                        .to.equal('Please ensure link ID is provided.');
                })
                .end(done);
        });
    });
});
