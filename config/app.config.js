/* globals __dirname */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const authentificationConfig = require('./auth.config');

const configureApp = (app) => {
    authentificationConfig.configureAuthentification(app);

    app.set('view engine', 'pug');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/libs', express.static(path.join(__dirname, '../node_modules/')));
    app.use('/public', express.static(path.join(__dirname, '../public')));

    app.use(require('connect-flash')());
    app.use((req, res, next) => {
        res.locals.messages = require('express-messages')(req, res);
        next();
    });
};

module.exports = {
    configureApp,
};
