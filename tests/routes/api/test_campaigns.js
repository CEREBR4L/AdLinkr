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

const Campaign = require('../../../backend/models/Campaign');
const app = require('../../../backend/app');

after(() => {
    mongoose.connection.close();
});

describe('POST Campaigns/Add', () => {
    it('Should add a new campaign with valid input', (done) => {
        request(app)
            .post('/api/Campaigns/Add')
            .send({campaignName: 'Test'})
            .expect((res) => {
                expect(res.body.name).to.equal('Test');
                expect(res.body.createdTimestamp)
                    .to.equal(res.body.lastModifiedTimestamp);
            })
            .end(done);
    });

    it('Should fail to add a new campaign with no name', (done) => {
        request(app)
            .post('/api/Campaigns/Add')
            .expect((res) => {
                expect(res.body).haveOwnProperty('error');
            })
            .end(done);
    });
});

describe('GET Campaigns/Delete/:id', () => {
    it('Should delete campaign when given valid ID', (done) => {
        const testCampaign = new Campaign({
            name: 'Test Campaign',
            createdTimestamp: 1524961895621,
            lastModifiedTimestamp: 1524961895621,
        });

        testCampaign.save((err, data) => {
            request(app)
                .get(`/api/Campaigns/Delete/${data.id}`)
                .expect((res) => {
                    expect(res.body).to.haveOwnProperty('success');
                })
                .end(done);
        });
    });

    it('Should error out if ID is not provided.', (done) => {
        const testCampaign = new Campaign({
            name: 'Test Campaign',
            createdTimestamp: 1524961895621,
            lastModifiedTimestamp: 1524961895621,
        });

        testCampaign.save((err, data) => {
            request(app)
                .get(`/api/Campaigns/Delete/`)
                .expect((res) => {
                    expect(res.body).to.haveOwnProperty('error');
                })
                .end(done);
        });
    });
});
