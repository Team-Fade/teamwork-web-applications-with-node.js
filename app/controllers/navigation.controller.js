const navigationController = {
    getHomePage(req, res) {
        return res.render('navigation/home');
    },
    getAboutUsPage(req, res) {
        return res.render('navigation/about');
    },
    getRankingListPage(req, res) {
        return res.render('navigation/ranking');
    },
    getSignInPage(req, res) {
        return res.render('users/signin');
    },
    getRegisterPage(req, res) {
        return res.render('users/register');
    },
};

module.exports = navigationController;
