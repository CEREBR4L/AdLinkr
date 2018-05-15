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
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const coreRoutes = require('./routes/core/index');
const apiRoutes = require('./routes/api/index');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(bodyParser.json());
app.use(expressValidator());
app.use('/public', express.static('public'));

app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);
app.use('/', coreRoutes);

module.exports = app;
