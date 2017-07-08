const { Router } = require('express');
const navigationController = require('../controllers/navigation.controller');

const attach = (app) => {
    const router = new Router();

    router
        .get('/', (res, req) => navigationController.getHomePage(res, req))
        .get('/about', (res, req) =>
            navigationController.getAboutUsPage(res, req))
        .get('/ranking', (res, req) =>
            navigationController.getRankingListPage(res, req));

    app.use(router);
};

module.exports = attach;
