const navigationController = {
    getHomePage(req, res) {
        if (req.session.passport) {
            return res.render('navigation/home',
                { user: req.session.passport.user });
        }

        return res.render('navigation/home');
    },
    getAboutUsPage(req, res) {
        return res.render('navigation/about');
    },
    getRankingListPage(req, res) {
        return res.render('navigation/ranking');
    },
    getChatPage(req, res) {
        return res.render('navigation/chat');
    },
    getLoginPage(req, res) {
        return res.render('users/login');
    },
    getRegisterPage(req, res) {
        return res.render('users/register');
    },
};

module.exports = navigationController;
