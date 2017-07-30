const fs = require('fs');
const { imageHelper } = require('../../utils');
const { hashPasswordHelper } = require('../../utils');
const registerValidator =
    require('../../utils/validator/helpers/validate.register');
const userValidator =
    require('../../utils/validator/helpers/validate.user');

const init = (data) => {
    const usersController = {
        getProfilePage(req, res) {
            const user = res.locals.user;
            return res.render('users/profile', {
                user: user,
            });
        },
        getProfileEditPage(req, res) {
            const user = res.locals.user;
            return res.render('users/profile-edit', {
                user: user,
            });
        },
        editProfilePage(req, res) {
            const username = res.locals.user.username;

            const changePicturePromise = new Promise((resolve, reject) => {
                if (req.file) {
                    const image = imageHelper.setNewPicture(req);
                    res.locals.user.profileImage = image.data.value();
                    data.users.edit(
                        { username: username },
                        { $set: { profileImage: image } })
                        .then(() => {
                            fs.unlink(req.file.path, (err) => {
                                if (err) {
                                    req.session.sessionFlash = err;
                                }
                            });
                        });

                    req.flash('success',
                        'Your profile picture was changed!');
                }
            });

            const changePasswordPromise = new Promise((resolve, reject) => {
                if (typeof req.body.password === 'undefined') {
                    return;
                }

                data.users.edit(
                    { username: username },
                    {
                        $set: {
                            password:
                            hashPasswordHelper
                                .generateHashedPassword(req.body.password),
                        },
                    });
            });

            return data.users
                .getOne({
                    $and: [
                        { email: req.body.email },
                        { username: { $ne: username } },
                    ],
                })
                .then((user) => {
                    if (user) {
                        req.flash('error',
                            'That email is already in use!');
                        res.redirect('/user/profile/edit');
                        return;
                    }

                    const changeEmailPromise =
                    new Promise((resolve, reject) => {
                        if (typeof req.body.email === 'undefined') {
                            return;
                        }

                        if (registerValidator
                                    .validateEmail(req.body.email).isValid) {
                            req.session.passport.user.email = req.body.email;

                            data.users.edit(
                                { username: username },
                                { $set: { email: req.body.email } });
                        } else {
                            req.flash('error',
                                'Invalid email!');
                        }
                    });

                    Promise
                        .all([
                            changeEmailPromise,
                            changePicturePromise,
                            changePasswordPromise,
                        ])
                        .then(res.redirect('/user/profile/edit'));
                });
        },
        getMyEventsPage(req, res) {
            const username = res.locals.user.username;
            return Promise.all([
                data.events.getUserJoinedEvents(username),
                data.events.getUserCreatedEvents(username),
            ])
                .then((events) => {
                    if (events[0].length !== 0 || events[1].length !== 0) {
                        return res.render('users/my-events',
                            {
                                context: {
                                    joinedEvents: events[0],
                                    createdEvents: events[1],
                                },
                            });
                    }

                    req.flash('error', 'No events avaible for this user');
                    return res.render('users/my-events', { context: {} });
                });
        },
    };

    return usersController;
};

module.exports = { init };
