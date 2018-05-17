const {errorMessage} = require('../../services/ResponseService');

module.exports = (req, res) => {
    const errResponse = errorMessage('Unauthorized');

    res.sendStatus(401);
    res.json(errResponse);
};
