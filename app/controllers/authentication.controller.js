const passport = require('passport');
const userValidator = require('../../utils/validator').user;

const authenticationController = (data) => {
    return {
        register(req, res) {
            const user = req.body;

            // Validate item
            if (!userValidator(user)) {
                res.redirect('/error');
                return;
            }

            data.users.create(user)
                .then((dbItem) => {
                    return res.redirect('/');
                })
                .catch((err) => {
                    // connect-flash
                    req.flash('error', err);
                    return res.redirect('/error');
                });
        },
        login(req, res, next) {
            const authenticate = passport.authenticate('local', {
                successRedirect: '/user/profile',
                failureRedirect: '/login',
                failureFlash: true,
            });

            authenticate(req, res, next);
        },
        logout(req, res) {
            req.session.destroy((err) => {
                res.redirect('/');
            });
        },
    };
};

module.exports = authenticationController;
