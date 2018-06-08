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

const Campaign = require('../../../../backend/models/Campaign');
const app = require('../../../../backend/app');
const seed = require('../../../seeds/campaign.seed');

let token = '';

before((done) => {
    request(app)
        .post('/api/auth/login')
        .send({
            username: 'test@test.com',
            password: 'Test',
        })
        .expect((data) => {
            token = data.body.data.payload.token;
        })
        .end(done);
});

after(() => {
    mongoose.connection.close();
});

beforeEach((done) => {
    Campaign.remove({}).then(() => {
        return Campaign.insertMany(seed);
    }).then(() => {
        done();
    });
});

describe('/campaigns/ API Endpoints', () => {
    describe('POST Campaigns/Add', () => {
        it('Should add a new campaign with valid input', (done) => {
            request(app)
                .post('/api/campaigns/add')
                .set('x-access-token', token)
                .send({campaignName: 'Test'})
                .expect((res) => {
                    expect(res.body.data.payload.name).to.equal('Test');
                    expect(res.body.data.payload.createdTimestamp)
                        .to.equal(res.body.data.payload.lastModifiedTimestamp);
                })
                .end(done);
        });

        it('Should fail to add a new campaign with no name', (done) => {
            request(app)
                .post('/api/campaigns/add')
                .set('x-access-token', token)
                .expect((res) => {
                    expect(res.body).haveOwnProperty('error');
                })
                .end(done);
        });
    });

    describe('DELETE campaigns/delete/:id', () => {
        it('Should delete campaign when given valid ID', (done) => {
            const testCampaign = new Campaign({
                name: 'Test Campaign',
                createdTimestamp: 1524961895621,
                lastModifiedTimestamp: 1524961895621,
            });

            testCampaign.save((err, data) => {
                request(app)
                    .delete(`/api/campaigns/delete/${data.id}`)
                    .set('x-access-token', token)
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
                request(app)
                    .delete(`/api/campaigns/delete/`)
                    .set('x-access-token', token)
                    .expect((res) => {
                        expect(res.body).to.haveOwnProperty('error');
                    })
                    .end(done);
            testCampaign.save((err, data) => {

            });
        });

        it('Should error if ID is invalid', (done) => {
            request(app)
            .delete(`/api/campaigns/delete/12125`)
            .set('x-access-token', token)
            .expect((res) => {
                expect(res.body).to.haveOwnProperty('error');
            })
            .end(done);
        });
    });

    describe('PUT campaigns/edit/:id', () => {
        it('Should edit record with succcessful input', (done) => {
            request(app)
                .put('/api/campaigns/edit/578df3efb618f5141202a196')
                .set('x-access-token', token)
                .send({update: {
                    name: 'EditedCampaign',
                }})
                .expect((res) => {
                    const payload = res.body.data.payload;
                    expect(payload.name).to.equal('EditedCampaign');
                    expect(payload.lastModifiedTimestamp)
                        .to.not.equal(payload.createdTimestamp);
                })
                .end(done);
        });

        it('Should error if ID not provided', (done) => {
            request(app)
            .put('/api/campaigns/edit')
            .set('x-access-token', token)
            .expect((res) => {
                expect(res.body.error.message)
                    .to.equal('An ID must be provided.');
            })
            .end(done);
        });

        it('Should error out if ID is invalid', (done) => {
            request(app)
                .put('/api/campaigns/edit/578df3efb618f5141202a191')
                .send({update: {
                    name: 'EditedCampaign',
                }})
                .set('x-access-token', token)
                .expect((res) => {
                    expect(res.body.error.message)
                        .to.equal('Invalid ID.');
                })
                .end(done);
        });

        it('Should error out if update data is blank', (done) => {
            request(app)
            .put('/api/campaigns/edit/578df3efb618f5141202a196')
            .set('x-access-token', token)
            .expect((res) => {
                expect(res.body.error.message)
                    .to.equal('No changes provided');
            })
            .end(done);
        });
    });

    describe('GET campaigns/view/:id', () => {
        it('Should show data for valid ID', (done) => {
            request(app)
                .get(`/api/campaigns/view/578df3efb618f5141202a196`)
                .set('x-access-token', token)
                .expect((res) => {
                    const data = res.body.data.payload.data;
                    expect(data.name).to.equal('test campaign 1');
                })
                .end(done);
        });

        it('Should error if ID not provided', (done) => {
            request(app)
                .get(`/api/campaigns/view`)
                .set('x-access-token', token)
                .expect((res) => {
                    const data = res.body.error;
                    expect(data.message).to.equal('An ID must be provided.');
                })
                .end(done);
        });

        it('Should error out if ID is invalid', (done) => {
            request(app)
                .get(`/api/campaigns/view/578df3efb618f5141202a191`)
                .set('x-access-token', token)
                .expect((res) => {
                    const data = res.body.error;
                    expect(data.message).to.equal('Invalid ID.');
                })
                .end(done);
        });
    });

    describe('GET campaigns/viewAll', () => {
        it('Should show maximum of 25 results per page', (done) => {
            request(app)
                .get('/api/campaigns/viewAll')
                .set('x-access-token', token)
                .expect((res) => {
                    const data = res.body.data.payload.data;
                    expect(data.length).to.equal(25);
                })
                .end(done);
        });

        it('should show proper records if pagination used', (done) => {
            request(app)
                .get('/api/campaigns/viewAll?pageNumber=2')
                .set('x-access-token', token)
                .expect((res) => {
                    const data = res.body.data.payload.pagination;
                    expect(data.currentPage).to.equal('2');
                    expect(data.totalPages).to.equal(2);
                    expect(data.totalRows).to.equal(29);
                })
                .end(done);
        });

        it('should return error on invalid page', (done) => {
            request(app)
                .get('/api/campaigns/viewAll?pageNumber=3')
                .set('x-access-token', token)
                .expect((res) => {
                    expect(res.body).to.haveOwnProperty('error');
                    expect(res.body.error.message)
                        .to.equal('Invalid page number');
                })
                .end(done);
        });
    });
});
