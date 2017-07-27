const upload = require('../../config/multer.config');
const isAuthenticated = require('../../utils/isAuthenticated');

const attach = (app, router, data) => {
    const usersController = require('../controllers/users.controller')(data);

    router
        .get('/profile', isAuthenticated, (req, res) => {
            usersController.getProfilePage(req, res);
        })
        .get('/profile/edit', isAuthenticated, (req, res) => {
            usersController.getProfileEditPage(req, res);
        })
        .post('/profile/edit',
        isAuthenticated,
        upload.single('profile'), (req, res) => {
            usersController.editProfilePage(req, res);
        })
        .get('/profile/my-events', isAuthenticated, (req, res) => {
            usersController.getMyEventsPage(req, res);
        });
    app.use('/user', router);
};

module.exports = {
    attach,
};
