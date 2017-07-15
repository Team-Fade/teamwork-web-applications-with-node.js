const usersController = require('../controllers/users.controller');

const attach = (app, router, data) => {
    router
        .get('/profile-controls',
            (res, req) => usersController.getProfileControlsPage(res, req))
        .get('/profile',
            (res, req) => usersController.getProfilePage(res, req));

    app.use('/user', router);
};

module.exports = {
    attach,
};
