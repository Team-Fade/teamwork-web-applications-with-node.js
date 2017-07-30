const attach = (app, router, data) => {
    const navigationController =
        require('../controllers/navigation.controller').init(data);

    router
        .get('/',
        (res, req) => navigationController.getHomePage(res, req))
        .get('/home',
        (res, req) => navigationController.getHomePage(res, req))
        .get('/about',
        (res, req) => navigationController.getAboutUsPage(res, req))
        .get('/chat',
        (res, req) => navigationController.getChatPage(res, req))
        .get('/login',
        (res, req) => navigationController.getLoginPage(res, req))
        .get('/register',
        (res, req) => navigationController.getRegisterPage(res, req));
    app.use(router);
};

module.exports = {
    attach,
};

