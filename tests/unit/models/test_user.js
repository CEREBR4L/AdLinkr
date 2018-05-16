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
});
