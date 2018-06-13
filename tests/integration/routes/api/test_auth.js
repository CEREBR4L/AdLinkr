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
const jwt = require('jsonwebtoken');

const config = require('../../../../backend/config/config');
const User = require('../../../../backend/models/User');
const app = require('../../../../backend/app');
const seed = require('../../../seeds/user.seed');

beforeEach((done) => {
    User.remove({}, (err, data) => {
        return User.insertMany(seed, done);
    });
});

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

describe('Auth API Endpoints: ', () => {
    describe('POST auth/register', () => {
        it('Should register a new user with valid input', (done) => {
            request(app)
                .post('/api/auth/register')
                .send({
                    firstName: 'Test',
                    lastName: 'Test',
                    email: 'test123@test.com',
                    password: 'Test',
                    groupId: '1',
                })
                .expect((res) => {
                    expect(res.body.data.payload.firstName).to.equal('Test');
                    expect(res.body.data.payload.lastName).to.equal('Test');
                    expect(res.body.data.payload.email).to.equal('test123@test.com');
                    expect(res.body.data.payload.groupId).to.equal('1');
                })
                .end(done);
        });

        it('Should fail without valid information', (done) => {
            request(app)
                .post('/api/auth/register')
                .expect((res) => {
                    expect(res.body).haveOwnProperty('error');
                })
                .end(done);
        });
    });

    describe('GET auth/delete/:id', () => {
        it('Should delete a user when given valid ID', (done) => {
            const testUser = new User({
                firstName: 'Test',
                lastName: 'Test',
                email: 'test@testertest.com',
                password: 'Test',
                groupId: '1',
            });

            testUser.save((err, data) => {
                request(app)
                    .get(`/api/auth/delete/${data.id}`)
                    .set('x-access-token', token)
                    .expect((res) => {
                        expect(res.body).to.haveOwnProperty('success');
                    })
                    .end(done);
            });
        });

        it('Should error out if ID is not provided.', (done) => {
            request(app)
                .get(`/api/Campaigns/Delete/`)
                .set('x-access-token', token)
                .expect((res) => {
                    expect(res.body).to.haveOwnProperty('error');
                })
                .end(done);
        });
    });

    describe('POST auth/login', () => {
        it('Should login a user with valid credentials', (done) => {
            request(app)
                .post(`/api/auth/login`)
                .send({
                    username: 'test@test.com',
                    password: 'Test',
                })
                .expect((res) => {
                    expect(res.body).to.haveOwnProperty('success');
                    expect(res.body.data.payload).to.haveOwnProperty('token');
                })
                .end(done);
        });

        it('Should return error if required fields missing', (done) => {
            request(app)
                .post(`/api/auth/login`)
                .expect((res) => {
                    expect(res.body).to.haveOwnProperty('error');
                })
                .end(done);
        });

        it('Should produce invalid user error on bad username', (done) => {
            request(app)
                .post(`/api/auth/login`)
                .send({
                    username: 'test123@test.com',
                    password: 'test',
                })
                .expect((res) => {
                    expect(res.body).to.haveOwnProperty('error');
                    expect(res.body.error.message)
                        .to.equal('Invalid username.');
                })
                .end(done);
        });

        it('Should produce wrong password on invalid password', (done) => {
            request(app)
                .post(`/api/auth/login`)
                .send({
                    username: 'test@test.com',
                    password: 'wrong password',
                })
                .expect((res) => {
                    expect(res.body).to.haveOwnProperty('error');
                    expect(res.body.error.message)
                        .to.equal('Invalid password.');
                })
                .end(done);
        });

        it('Shoud update user refresh ID to match JWT', (done) => {
            request(app)
                .post(`/api/auth/login`)
                .send({
                    username: 'test@test.com',
                    password: 'Test',
                })
                .expect((res) => {
                    const data = res.body.data.payload;
                    expect(res.body).to.haveOwnProperty('success');
                    jwt.verify(data.token, config.auth.secret,
                        (err, decoded) => {
                            expect(data.refreshToken)
                                .to.equal(decoded.refreshToken);
                    });
                })
                .end(done);
        });
    });
});
