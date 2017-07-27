/* globals __dirname */

const express = require('express');
const path = require('path');
const flash = require('connect-flash');

const configureAuthentification = require('./auth.config');

const configureApp = (app, data) => {
    configureAuthentification(app, data);
    app.set('view engine', 'pug');

    app.use('/libs', express.static(path.join(__dirname, '../node_modules/')));
    app.use('/public', express.static(path.join(__dirname, '../public')));

    app.use(flash());
    app.use((req, res, next) => {
        res.locals.sessionFlash = req.session.sessionFlash;
        delete req.session.sessionFlash;
        next();
    });
    app.use((req, res, next) => {
        res.locals.messages = require('express-messages')(req, res);
        next();
    });
};

module.exports = {
    configureApp,
};
