/* globals __dirname */

const path = require('path');
const fs = require('fs');

const { Router } = require('express');
const router = new Router();

const attachRoutes = (app, data) => {
    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.router'))
        .map((file) => path.join(__dirname, file))
        .forEach((modulePath) => {
            require(modulePath).attach(app, router, data);
        });
};

module.exports = {
    attachRoutes,
};
