/**
 * AdLinkr
 * A URL shortening tool for digital marketers
 * https://github.com/jodylecompte/AdLinkr
 * License: MIT
 *
 * Written by Jody LeCompte <jody@jodylecompte.com
 * Website: https://jodylecompte.com
 */

const express = require('express');
const router = new express.Router();

const AuthRegister = require('./register');
const AuthDelete = require('./delete');

router.post('/register', AuthRegister);
router.get('/delete/:id*?', AuthDelete);

module.exports = router;
