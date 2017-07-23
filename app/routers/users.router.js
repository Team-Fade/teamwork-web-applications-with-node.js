const upload = require('../../config/multer.config');

const attach = (app, router, data) => {
    const usersController = require('../controllers/users.controller')(data);

    router
        .get('/profile', (req, res) => {
            usersController.getProfilePage(req, res);
        })
        .get('/profile/edit', (req, res) => {
            usersController.getProfileEditPage(req, res);
        })
        .post('/profile/edit', upload.single('profile'), (req, res) => {
            usersController.editProfilePage(req, res);
        })
        .get('/profile/my-events', (req, res) => {
            usersController.getMyEventsPage(req, res);
        });
    app.use('/user', router);
};

module.exports = {
    attach,
};
