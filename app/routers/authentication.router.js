const attach = (app, router, data) => {
    const authController =
        require('../controllers/authentication.controller').init(data);

    router
        .post('/login', (req, res, next) =>
            authController.login(req, res, next))
        .post('/register', (res, req) =>
            authController.register(res, req))
        .get('/logout', (res, req) =>
            authController.logout(res, req));

    app.use(router);
};

module.exports = {
    attach,
};

