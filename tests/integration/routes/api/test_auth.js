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

const User = require('../../../../backend/models/User');
const app = require('../../../../backend/app');

describe('POST auth/register', () => {
    beforeEach((done) => {
        User.remove({}).then((err, data) => {
            done();
        });
    });

    it('Should register a new user with valid input', (done) => {
        request(app)
            .post('/api/auth/register')
            .send({
                firstName: 'Test',
                lastName: 'Test',
                email: 'test@test.com',
                password: 'Test',
                groupId: '1',
            })
            .expect((res) => {
                expect(res.body.firstName).to.equal('Test');
                expect(res.body.lastName).to.equal('Test');
                expect(res.body.email).to.equal('test@test.com');
                expect(res.body.groupId).to.equal('1');
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
            email: 'test@test.com',
            password: 'Test',
            groupId: '1',
        });

        testUser.save((err, data) => {
            request(app)
                .get(`/api/auth/delete/${data.id}`)
                .expect((res) => {
                    expect(res.body).to.haveOwnProperty('success');
                })
                .end(done);
        });
    });

    it('Should error out if ID is not provided.', (done) => {
        request(app)
            .get(`/api/Campaigns/Delete/`)
            .expect((res) => {
                expect(res.body).to.haveOwnProperty('error');
            })
            .end(done);
    });
});
