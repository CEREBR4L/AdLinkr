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
const seed = require('../../../seeds/link.seed');

const exampleLinkCustom = {
    _id: 500,
    url: 'https://google.com',
    shortCode: 'testCode',
};

const exampleLinkUTM = {
    url: 'https://google.com',
    utmSource: 'Test',
    utmMedium: 'Test',
    utmTerm: 'Test',
    utmContent: 'Test',
    utmCampaign: 'Test',
};

after(() => {
    mongoose.connection.close();
});

beforeEach((done) => {
    Link.remove({}).then(() => {
        return Link.insertMany(seed);
    }).then(() => {
        done();
    });
});

describe('/links/ API Endpoints', () => {
    describe('POST links/add', () => {
        it('Should add a new link with valid input', (done) => {
            request(app)
                .post('/api/links/add')
                .send(exampleLinkUTM)
                .expect((res) => {
                    expect(res.body.data.payload.url).to.equal('https://google.com');
                    expect(res.body.data.payload.createdTimestamp)
                        .to.equal(res.body.data.payload.lastModifiedTimestamp);
                })
                .end(done);
        });

        it('Should fail to add a new link without valid input', (done) => {
            request(app)
                .post('/api/links/add')
                .expect((res) => {
                    expect(res.body).haveOwnProperty('error');
                    expect(res.body.error.message)
                        .to.equal('A URL must be provided.');
                })
                .end(done);
        });

        it('Should allow custom short codes', (done) => {
            request(app)
                .post('/api/links/add')
                .send(exampleLinkCustom)
                .expect((res) => {
                    expect(res.body.data.payload.shortCode)
                        .to.equal(exampleLinkCustom.shortCode);
                })
                .end(done);
        });

        it('Should not allow duplicate shortcodes', (done) => {
            const newUser = new Link(exampleLinkCustom);
            newUser.save()
                .then((data) => {
                    request(app)
                        .post('/api/links/add')
                        .send(exampleLinkCustom)
                        .expect((res) => {
                            expect(res.body.error.message)
                                .to.equal('ShortCode already exists');
                        })
                        .end(done);
                });
        });
    });

    describe('DELETE links/delete/:id', () => {
        beforeEach((done) => {
            const testLink = new Link(exampleLinkUTM);

            Link.createLink(testLink, (err, data) => {
                done();
            });
        });

        it('Should delete link when given valid ID', (done) => {
            const testLink = new Link(exampleLinkUTM);

            Link.createLink(testLink, (err, data) => {
                request(app)
                    .delete(`/api/links/delete/${data.id}`)
                    .expect((res) => {
                        expect(res.body).to.haveOwnProperty('success');
                    })
                    .end(done);
            });
        });

        it('Should error out if ID is not provided.', (done) => {
            request(app)
                .delete(`/api/links/delete/`)
                .expect((res) => {
                    expect(res.body.error.message)
                        .to.equal('A URL must be provided.');
                })
                .end(done);
        });

        it('Should fail if ID does not exist', (done) => {
            request(app)
            .delete('/api/links/delete/1')
            .expect((res) => {
                expect(res.body.error.message)
                    .to.equal('ID does not exist');
            })
            .end(done);
        });
    });

    describe.only('PUT links/edit/:id', () => {
        it('Should update link with valid information', (done) => {
            request(app)
                .put('/api/links/edit/10000')
                .send({update: {
                    url: 'www.yahoo.com',
                }})
                .expect((res) => {
                    const payload = res.body.data.payload;
                    expect(payload.url).to.equal('www.yahoo.com');
                })
                .end(done);
        });

        it('Should return an error with no ID', (done) => {
            request(app)
                .put('/api/links/edit')
                .expect((res) => {
                    expect(res.body.error.message)
                        .to.equal('An ID must be provided.');
                })
            .end(done);
        });

        it('Should return an error if ID is invalid.', (done) => {
            request(app)
                .put('/api/links/edit/1012512')
                .send({update: {
                    url: 'www.yahoo.com',
                }})
                .expect((res) => {
                    expect(res.body.error.message)
                        .to.equal('Invalid ID.');
                })
            .end(done);
        });

        it('Shoud not allow duplicate shortCode by edit', (done) => {
            request(app)
            .put('/api/links/edit/10000')
            .send({update: {
                shortCode: 'jody',
            }})
            .expect((res) => {
                expect(res.body.error.message)
                    .to.contain('dup key');
            })
        .end(done);
        });

        it('Shoud allow non-duplicate shortCode edit', (done) => {
            request(app)
            .put('/api/links/edit/10000')
            .send({update: {
                shortCode: 'brandNewCode1',
            }})
            .expect((res) => {
                expect(res.body.data.payload._id).to.equal(10000);
            })
        .end(done);
        });
    });

    describe('GET links/view/:id', () => {
        it('Should return information with valid id', (done) => {
            request(app)
                .get(`/api/links/view/10000`)
                .expect((res) => {
                    const data = res.body.data.payload.data;
                    expect(data._id).to.equal(10000);
                })
                .end(done);
        });

        it('Should return error if no ID is provided', (done) => {
            request(app)
                .get(`/api/links/view`)
                .expect((res) => {
                    const data = res.body.error;
                    expect(data.message).to.equal('An ID must be provided.');
                })
                .end(done);
        });

        it('Should error out if ID is invalid', (done) => {
            request(app)
                .get('/api/links/view/12512512124')
                .expect((res) => {
                    const data = res.body.error;
                    expect(data.message).to.equal('ID does not exist.');
                })
                .end(done);
        });
    });

    describe('GET links/viewAll', () => {
        it('Should show maximum of 25 results per page', (done) => {
            request(app)
                .get('/api/links/viewAll')
                .expect((res) => {
                    const data = res.body.data.payload.data;
                    expect(data.length).to.equal(25);
                })
                .end(done);
        });

        it('should show proper records if pagination used', (done) => {
            request(app)
                .get('/api/links/viewAll?pageNumber=2')
                .expect((res) => {
                    const data = res.body.data.payload.pagination;
                    expect(data.currentPage).to.equal('2');
                    expect(data.totalPages).to.equal(2);
                    expect(data.totalRows).to.equal(30);
                })
                .end(done);
        });

        it('should return error on invalid page', (done) => {
            request(app)
                .get('/api/links/viewAll?pageNumber=3')
                .expect((res) => {
                    expect(res.body).to.haveOwnProperty('error');
                    expect(res.body.error.message)
                        .to.equal('Invalid page number');
                })
                .end(done);
        });
    });
});
