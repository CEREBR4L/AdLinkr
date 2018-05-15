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

const CampaignRoutes = require('../../routes/api/campaigns/index');
const AuthRoutes = require('../../routes/api/auth/index');
const LinkRoutes = require('../../routes/api/links/index');

router.use('/campaigns', CampaignRoutes);
router.use('/auth', AuthRoutes);
router.use('/links', LinkRoutes);

router.get('/*', (req, res) => {
    res.json({'error': 'Invalid endpoint.'});
});

module.exports = router;
