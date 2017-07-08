const usersController = {
    getSignInPage(req, res) {
        return res.render('users/signin');
    },
    getRegisterPage(req, res) {
        return res.render('users/register');
    },
};

module.exports = usersController;
