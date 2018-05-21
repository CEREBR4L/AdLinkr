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
const ViewAllRoute = require('./view_all');
const ViewRoute = require('./view');
const EditRoute = require('./edit');

router.get('/viewAll/:campaignId*?', ViewAllRoute);
router.get('/view/:id*?', ViewRoute);
router.post('/add', AddRoute);
router.put('/edit/:id*?', EditRoute);
router.delete('/delete/:id*?', DeleteRoute);

module.exports = router;
