const attach = (app, router, data) => {
    const authController =
        require('../controllers/authentication.controller')(data);

    router
        .post('/login', (res, req) => authController.login(res, req))
        .post('/register', (res, req) => authController.register(res, req))
        .post('/logout', (res, req) => authController.logout(res, req));

    app.use(router);
};

module.exports = {
    attach,
};

