const navigationController = require('../controllers/navigation.controller');

const attach = (app, router, data) => {
    router
        .get('/',
        (res, req) => navigationController.getHomePage(res, req))
        .get('/about',
        (res, req) => navigationController.getAboutUsPage(res, req))
        .get('/ranking',
        (res, req) => navigationController.getRankingListPage(res, req))
        .get('/signin',
        (res, req) => navigationController.getSignInPage(res, req))
        .get('/register',
        (res, req) => navigationController.getRegisterPage(res, req));

    app.use(router);
};

module.exports = {
    attach,
};

