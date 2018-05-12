/**
 * AdLinkr
 * A URL shortening tool for digital marketers
 * https://github.com/jodylecompte/AdLinkr
 * License: MIT
 *
 * Written by Jody LeCompte <jody@jodylecompte.com
 * Website: https://jodylecompte.com
 */

const User = require('../../backend/models/User');
let expect = require('chai').expect;

const seed = require('../seeds/user.seed');
require('../../backend/db');

describe('Models: User', function() {
    it('should be invalid if any required fields are empty', () => {
        const user = new User();

        user.validate((err) => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.email).to.exist;
            expect(err.errors.password).to.exist;
            expect(err.errors.groupId).to.exist;
        });
    });

    it('should allow for all optional / event based fields', () => {
        const user = new User({
            firstName: 'Test',
            lastName: 'Test',
            email: 'test@test.com',
            password: 'Test',
            groupId: 1,
            forgotPasswordCode: 'null',
            forgotPasswordTime: 12345678,
            activationCode: 12345,
        });

        expect(user.forgotPasswordCode).to.equal('null');
        expect(user.forgotPasswordTime).to.equal(12345678);
        expect(user.activationCode).to.equal(12345);
    });

    it('should be invalid if email address is invalid', () => {
        const user = new User({
            firstName: 'Test',
            lastName: 'Test',
            email: 'Test',
            password: 'Test',
            groupId: 1,
        });

        user.validate((err) => {
            expect(err.errors.email);
        });
    });

    describe('Methods: ', () => {
        beforeEach(function(done) {
            User.remove({}).then(() => {
                return User.insertMany(seed);
              }).then(() => done());
        });

        describe('checkUnique', () => {
            it('checkUnique should return false if duplicate user is found',
            function(done) {
                User.checkUnique('test@test.com', function(data) {
                    expect(data).to.equal(false);
                    done();
                });
            });

            it('checkUnique should return false if duplicate user is true',
            function(done) {
                User.checkUnique('teswft@test.com', function(data) {
                    expect(data).to.equal(true);
                    done();
                });
            });
        });

        describe('createUser', () => {
            it('should create a new user with valid input', (done) => {
                const userData = {
                    firstName: 'Jody',
                    lastName: 'LeCompte',
                    email: 'test1@test.com',
                    groupId: '32512f',
                    password: 'null',
                };

                User.createUser(userData, (err, data) => {
                    User.find({email: userData.email})
                        .then((data) => {
                            expect(data.length).to.equal(1);
                            done();
                        });
                });
            });

            it('should not create a new user with invalid input', (done) => {
                const userData = {
                    firstName: 'Jody',
                    lastName: 'LeCompte',
                    email: 'test@test.com',
                    groupId: '3',
                    password: 'null',
                };

                User.createUser(userData, (err, data) => {
                    User.find({email: userData.email})
                        .then((data) => {
                            expect(data.length).to.equal(1);
                            done();
                        });
                });
            });

            it('should hash the password before saving', (done) => {
                const userData = {
                    firstName: 'Jody',
                    lastName: 'LeCompte',
                    email: 'test1@test.com',
                    groupId: '3',
                    password: 'test',
                };

                User.createUser(userData, (err, data) => {
                    User.find({email: userData.email})
                        .then((data) => {
                            expect(data[0].password)
                            .to.not
                            .equal(userData.password);
                            done();
                        });
                });
            });
        });
    });
});
