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
const EditRoute = require('./edit');
const ViewRoute = require('./view');
const ViewAllRoute = require('./viewAll');

router.post('/add', AddRoute);
router.put('/edit/:id*?', EditRoute);
router.delete('/delete/:id*?', DeleteRoute);
router.get('/view/:id*?', ViewRoute);
router.get('/viewAll', ViewAllRoute);

module.exports = router;
