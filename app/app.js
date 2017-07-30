const express = require('express');
const { appConfig } = require('../config');


const init = (data) => {
    const app = express();

    appConfig.configureApp(app, data);

    require('./routers')
        .attachRoutes(app, data);

    return Promise.resolve(app);
};

module.exports = {
    init,
};
