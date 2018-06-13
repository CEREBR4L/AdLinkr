/**
 * AdLinkr
 * A URL shortening tool for digital marketers
 * https://github.com/jodylecompte/AdLinkr
 * License: MIT
 *
 * Written by Jody LeCompte <jody@jodylecompte.com
 * Website: https://jodylecompte.com
 */

const User = require('../../../backend/models/User');
let expect = require('chai').expect;

const seed = require('../../seeds/user.seed');
require('../../../backend/db');

describe('Models: User', function() {
    describe('Methods: ', () => {
        beforeEach(function(done) {
            User.remove({}).then(() => {
                return User.insertMany(seed);
              }).then(() => done());
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
