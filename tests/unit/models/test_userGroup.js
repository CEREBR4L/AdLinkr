/**
 * AdLinkr
 * A URL shortening tool for digital marketers
 * https://github.com/jodylecompte/AdLinkr
 * License: MIT
 *
 * Written by Jody LeCompte <jody@jodylecompte.com
 * Website: https://jodylecompte.com
 */

const expect = require('chai').expect;

const UserGroup = require('../../../backend/models/UserGroup');


describe('Models: UserGroup', function() {
    it('should be invalid if name is empty', () => {
        const userGroup = new UserGroup();

        userGroup.validate((err) => {
            expect(err.errors.name).to.exist;
        });
    });
});
