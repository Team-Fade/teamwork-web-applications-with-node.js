const passport = require('passport');
const { imageHelper } = require('../../utils');
const VALIDATOR = require('../../utils/validator/validator.new');

const init = ({ users }) => {
    const authenticationController = {
        register(req, res, next) {
            const user = JSON.parse(JSON.stringify(req.body));

            const error = VALIDATOR.validateRegister(user);

            if (error.message) {
                req.flash('register', error.message);
                return res.redirect('/register');
            }

            return users
                .getOne({
                    $or:
                    [
                        { username: req.body.username },
                        { email: req.body.email },
                    ],
                })
                .then((existingUser) => {
                    if (existingUser) {
                        req.flash('register',
                            'User with that username or email already exists!');

                        return res.redirect('/register');
                    }

                    user.profileImage = imageHelper.getDefaultProfilePricture();

                    return users
                        .add(user)
                        .then((dbItem) => {
                            return this.login(req, res, next);
                        })
                        .catch((err) => {
                            req.flash('register', err);
                            return res.redirect('/register');
                        });
                });
        },
        login(req, res, next) {
            passport.authenticate('local', {
                successRedirect: '/user/profile',
                failureRedirect: '/login',
                failureFlash: true,
            })(req, res, next);
        },
        logout(req, res) {
            req.session.destroy((err) => {
                res.redirect('/');
            });
        },
    };

    return authenticationController;
};

module.exports = { init };
