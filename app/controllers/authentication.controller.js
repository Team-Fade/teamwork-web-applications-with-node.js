const passport = require('passport');
const validator = require('../../utils/validator');

const authenticationController = ({ users }) => {
    return {
        register(req, res, next) {
            const user = req.body;

            if (!validator.isValidUser(user)) {
                res.redirect('/error');
                return;
            }

            // Check if user with the same username already exists in db
            users.collection
                .findOne(
                { 'username': req.body.username }, (_, existingUser) => {
                    if (existingUser) {
                        req.flash('error',
                            'User with that username already exists!');

                        return res.redirect('/register');
                    }
                    // Sets the default profile picture
                    user.imageUrl = 'https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png';

                    return users.add(user)
                        .then((dbItem) => {
                            // After successful register, user is logged in
                            req.login({
                                username: user.username,
                                password: user.password,
                            }, (err) => {
                                if (err) {
                                    req.flash('error', err);
                                }

                                return res.redirect('/');
                            });
                        })
                        .catch((err) => {
                            req.flash('error', err);
                            return res.redirect('/register');
                        });
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
