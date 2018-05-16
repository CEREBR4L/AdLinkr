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

const {
    successMessage,
    errorMessage,
} = require('../../../backend/services/ResponseService');

const successWithData = {
    'success': {
            'message': 'Campaign added',
    },
    'data': {
        type: 'campaign',
        payload: {name: 'test'},
    },
};

const successWithoutData = {
    'success': {
            'message': 'Campaign added',
    },
    'data': null,
};

const errorWithData = {
    'error': {
        'message': 'User first name required',
    },
    'data': {
        type: 'user',
        payload: {
            lastName: 'test',
            email: 'test@test.com',
        },
    },
};

const errorWithoutData = {
    'error': {
        'message': 'Generic error',
    },
    'data': null,
};

describe('Services: Response service', () => {
    describe('successMessage()', () => {
        it('should produce a valid success response object', () => {
            const actual = successMessage('Campaign added', 'campaign', {
                name: 'test',
            });

            expect(actual).to.deep.equal(successWithData);
        });

        it('should throw an exception without message', () => {
            expect(successMessage).to.throw('Message is a required parameter');
        });

        it('should not have data object if payload & type are null', () => {
            const actual = successMessage('Campaign added');

            expect(actual).to.deep.equal(successWithoutData);
        });

        it('Should throw exception if given partial data', () => {
            expect(successMessage.bind(successMessage, 'Test', 'Link'))
                .to.throw('Must supply both optional parameters or neither.');
        });
    });

    describe('errorMessage()', () => {
        it('should produce a valid error response object', () => {
            const actual = errorMessage('User first name required', 'user', {
                lastName: 'test',
                email: 'test@test.com',
            });

            expect(actual).to.deep.equal(errorWithData);
        });

        it('should throw an exception without message', () => {
            expect(errorMessage).to.throw('Message is a required parameter');
        });

        it('should not have data object if payload & type are null', () => {
            const actual = errorMessage('Generic error');

            expect(actual).to.deep.equal(errorWithoutData);
        });

        it('Should throw exception if given partial data', () => {
            expect(errorMessage.bind(errorMessage, 'Test', 'Link'))
            .to.throw('Must supply both optional parameters or neither.');
        });
    });
});
