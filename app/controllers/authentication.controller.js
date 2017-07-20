const passport = require('passport');
const { validator } = require('../../utils');
const { imageHelper } = require('../../utils');

const authenticationController = ({ users }) => {
    return {
        register(req, res, next) {
            const user = JSON.parse(JSON.stringify(req.body));

            if (!validator.validateUser(user).isValid) {
                const errorMessage = validator.validateUser(user).errorMessage;
                req.flash('error', errorMessage);
                return res.render('users/register');
            }

            return users.collection
                .findOne(
                { 'username': req.body.username }, (_, existingUser) => {
                    if (existingUser) {
                        req.flash('error',
                            'User with that username already exists!');

                        return res.redirect('/register');
                    }

                    user.profileImage = imageHelper.getDefaultProfilePricture();
                    console.log(user);
                    return users.add(user)
                        .then((dbItem) => {
                            return this.login(req, res, next);
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
