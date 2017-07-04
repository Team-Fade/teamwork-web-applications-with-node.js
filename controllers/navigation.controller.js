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
};

module.exports = navigationController;
