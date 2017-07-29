const navigationController = ({ events }) => {
    return {
        getHomePage(req, res) {
            let user = null;
            if (req.session.passport) {
                user = req.session.passport.user;
            }

            return events
                .sortEventsByParticipants()
                .then((eventsData) => {
                    return res.render('navigation/home',
                        {
                            user: user,
                            context: eventsData,
                        });
                });
        },
        getAboutUsPage(req, res) {
            if (req.session.passport) {
                return res.render('navigation/about',
                    { user: req.session.passport.user });
            }

            return res.render('navigation/about');
        },
        getChatPage(req, res) {
            if (req.session.passport) {
                return res.render('navigation/chat',
                    { user: req.session.passport.user });
            }

            return res.render('navigation/chat');
        },
        getLoginPage(req, res) {
            return res.render('users/login');
        },
        getRegisterPage(req, res) {
            return res.render('users/register');
        },
    };
};

module.exports = navigationController;
