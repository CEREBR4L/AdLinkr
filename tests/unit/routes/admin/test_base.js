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

const baseRoute = require('../../../../backend/routes/admin/base');

const res = {
    sendStatus: sinon.spy(),
    json: sinon.spy(),
};
const req = {};

describe('Admin Routes - base.js - / ', () => {
    it('Should only send a status once', () => {
        baseRoute(req, res);
        expect(res.sendStatus.calledOnce).to.equal(true);
    });

    it('Should send a status code of 200', () => {
        baseRoute(req, res);
        expect(res.sendStatus.calledWith(200)).to.equal(true);
    });
});
