const { Router } = require('express');
const usersController = require('../controllers/users.controller');

const attachUsers = (app) => {
    const router = new Router();

     router
        .get('/signin', (res, req) => usersController.getSignInPage(res, req))
        .get('/register',
            (res, req) => usersController.getRegisterPage(res, req));
    app.use(router);
};

module.exports = attachUsers;
