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

const AddRoute = require('./add');
const DeleteRoute = require('./delete');

router.post('/add', AddRoute);
router.get('/delete/:id*?', DeleteRoute);

module.exports = router;
