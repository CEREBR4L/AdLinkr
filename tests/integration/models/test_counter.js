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

const Counter = require('../../../backend/models/Counter');
const seed = require('../../seeds/counter.seed');

describe('Models: Counter', function() {
    describe('Methods: ', () => {
        describe('nextId', () => {
            it('should initalize at 1000', (done) => {
                Counter.remove({}).then(() => {
                    return Counter.insertMany(seed);
                  }).then(() => {
                    Counter.nextId('link', (data) => {
                        expect(data).to.equal(1000);
                        done();
                    });
                  });
            });

            it('Shold increment by one each call', (done) => {
                Counter.nextId('link', (data) => {
                    expect(data).to.equal(1001);
                    done();
                });
            });
        });
    });
});
