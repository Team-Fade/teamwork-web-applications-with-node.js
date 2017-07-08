/* globals __dirname */

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const configApp = (app) => {
    app.set('view engine', 'pug');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use('/libs',
        express.static(path.join(__dirname, '../node_modules')));
    app.use('/public',
        express.static(path.join(__dirname, '../public')));
};

module.exports = configApp;
