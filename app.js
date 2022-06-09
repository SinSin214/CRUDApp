require('module-alias/register');
const express = require('express');
const app = express();
require('./src/route/index')(app);

module.exports = app;
