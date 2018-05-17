/**
 * AdLinkr
 * A URL shortening tool for digital marketers
 * https://github.com/jodylecompte/AdLinkr
 * License: MIT
 *
 * Written by Jody LeCompte <jody@jodylecompte.com
 * Website: https://jodylecompte.com
 */

const sinon = require('sinon');
const expect = require('chai').expect;

const Link = require('../../../../backend/models/Link');
const shortUrlRoute = require('../../../../backend/routes/core/shortUrl');

const res = {
    sendStatus: sinon.spy(),
    json: sinon.spy(),
};

const validReq = {
    req: {
        params: {
            shortCode: 'validCode',
        },
    },
};

const invalidReq = {
    req: {
        params: {},
    },
};

describe.only('Core Routes - base.js - / ', () => {
    beforeEach(() => {
        sinon.mock('Link', 'findOne');
    });

    afterEach(() => {
        // Link.findOne.restore();
    });

    it('should do something ,shit', () => {
        shortUrlRoute(validReq, res);
        console.log(Link.findOne);
    });
});
