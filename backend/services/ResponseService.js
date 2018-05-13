/**
 * AdLinkr
 * A URL shortening tool for digital marketers
 * https://github.com/jodylecompte/AdLinkr
 * License: MIT
 *
 * Written by Jody LeCompte <jody@jodylecompte.com
 * Website: https://jodylecompte.com
 */

const _genericMessage = (type, message, dataType=null, dataPayload=null) => {
    if (!message) {
        throw new Error('Message is a required parameter');
    }

    let response = {};
    response[type] = {message};

    if (dataType === null && dataPayload === null) {
        response['data'] = null;
    } else {
        if (dataType === null || dataPayload === null) {
            throw new Error('Must supply both optional parameters or neither.');
        }
        response['data'] = {
            type: dataType,
            payload: dataPayload,
        };
    }

    return response;
};

const successMessage = (message, dataType=null, dataPayload=null) => {
    return _genericMessage('success', message, dataType, dataPayload);
};

const errorMessage = (message, dataType=null, dataPayload=null) => {
    return _genericMessage('error', message, dataType, dataPayload);
};

module.exports = {
    successMessage,
    errorMessage,
};
