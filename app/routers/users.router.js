const usersController = require('../controllers/users.controller');

const attach = (app, router, data) => {
    app.use(router);
};

module.exports = {
    attach,
};
