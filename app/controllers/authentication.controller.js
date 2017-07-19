const passport = require('passport');
const validator = require('../../utils/validator');
const fs = require('fs');

const authenticationController = ({ users }) => {
    return {
        register(req, res, next) {
            const user = JSON.parse(JSON.stringify(req.body));

            if (!validator.isValidUser(user)) {
                res.redirect('/error');
                return;
            }

            users.collection
                .findOne(
                { 'username': req.body.username }, (_, existingUser) => {
                    if (existingUser) {
                        req.flash('error',
                            'User with that username already exists!');

                        return res.redirect('/register');
                    }

                    // Sets the default profile picture
                    const newImg =
                        fs.readFileSync(
                            'public/imgs/default-profile.jpg');

                    const image = {
                        default: newImg.toString('base64'),
                    };

                    user.profileImage = image;
                    return users.add(user)
                        .then((dbItem) => {
                            // After successful register, user is logged in
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
