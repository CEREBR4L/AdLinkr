/**
 * AdLinkr
 * A URL shortening tool for digital marketers
 * https://github.com/jodylecompte/AdLinkr
 * License: MIT
 *
 * Written by Jody LeCompte <jody@jodylecompte.com
 * Website: https://jodylecompte.com
 */

const mongoose = require('mongoose');
let expect = require('chai').expect;

const User = require('../../backend/models/UserGroup');

after(() => {
    mongoose.connection.close();
});

describe('Models: UserGroup', function() {
    it('should be invalid if name is empty', () => {
        const user = new User();

        user.validate((err) => {
            expect(err.errors.name).to.exist;
        });
    });
});
