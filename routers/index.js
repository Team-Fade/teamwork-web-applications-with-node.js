/* globals __dirname */

const path = require('path');
const fs = require('fs');

const attachRoutes = (app) => {
    fs.readdirSync(__dirname)
    .filter((file) => file.includes('router.js'))
    .map((file) => path.join(__dirname, file))
    .forEach((modulePath) => {
        require(modulePath)(app);
    });
};

module.exports = attachRoutes;
