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

const baseRoute = require('../../../../backend/routes/core/base');

const res = {
    sendStatus: sinon.spy(),
    json: sinon.spy(),
};
const req = {};

describe('Core Routes - base.js - / ', () => {
    it('Should only send json once', () => {
        baseRoute(req, res);
        expect(res.json.calledOnce).to.equal(true);
    });

    it('Should send a status code of 401', () => {
        baseRoute(req, res);
        expect(res.sendStatus.calledWith(401)).to.equal(true);
    });

    it('Should send an error object', () => {
        baseRoute(req, res);
        expect(res.json.args[0][0]).to.haveOwnProperty('error');
    });
});
