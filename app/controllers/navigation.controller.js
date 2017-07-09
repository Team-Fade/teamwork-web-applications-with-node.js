const navigationController = {
    getHomePage(req, res) {
        return res.render('navigation/home', {
            isAuthenticated: req.user,
        });
    },
    getAboutUsPage(req, res) {
        return res.render('navigation/about');
    },
    getRankingListPage(req, res) {
        return res.render('navigation/ranking');
    },
    getLoginPage(req, res) {
        return res.render('users/login');
    },
    getRegisterPage(req, res) {
        return res.render('users/register');
    },
};

module.exports = navigationController;
