const passport = require('passport');
const validator = require('../../utils/validator');

const authenticationController = (data) => {
    return {
        register(req, res) {
            const user = req.body;

            // Sets the default profile picture
            user.imageUrl = 'https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png';

            if (!validator.isValidUser(user)) {
                res.redirect('/error');
                return;
            }

            data.users.add(user)
                .then((dbItem) => {
                    return res.redirect('/');
                })
                .catch((err) => {
                    // connect-flash
                    req.flash('error', err);
                    return res.redirect('/register');
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
