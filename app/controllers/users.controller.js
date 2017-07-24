const fs = require('fs');
const { imageHelper } = require('../../utils');
const { hashPasswordHelper } = require('../../utils');

const usersController = (data) => {
    return {
        getProfilePage(req, res) {
            if (!res.locals.user) {
                return res.redirect('/');
            }

            const username = res.locals.user.username;

            return data.users
                .getOne({ username: username })
                .then((user) => {
                    if (user.profileImage.encoded) {
                        return res.render('users/profile', {
                            encodedImg: user.profileImage.encoded.value(),
                            user: user,
                        });
                    }

                    return res.render('users/profile', {
                        defaultImg: user.profileImage.default,
                        user: user,
                    });
                });
        },
        getProfileEditPage(req, res) {
            const username = res.locals.user.username;
            return data.users.getOne({ username: username })
                .then((user) => {
                    return res.render('users/profile-edit', {
                        user: user,
                    });
                });
        },
        editProfilePage(req, res) {
            const username = res.locals.user.username;

            const changeEmailPromise = new Promise((resolve, reject) => {
                if (req.body.email !== '') {
                    data.users.getOne(
                        {
                            $and: [
                                { email: req.body.email },
                                { username: { $ne: username } },
                            ],
                        }
                    )
                        .then((user) => {
                            if (user.username ||
                                req.body.email === '' ||
                                req.body.email === null ||
                                typeof req.body.email === 'undefined') {
                                return {
                                    errorMessage: 'Incorrect email!',
                                };
                            }

                            return data.users.edit(
                                { username: username },
                                { $set: { email: req.body.email } });
                        });
                }
            });

            const changePicturePromise = new Promise((resolve, reject) => {
                if (req.file) {
                    const image = imageHelper.setNewPicture(req);
                    data.users.edit(
                        { username: username },
                        { $set: { profileImage: image } })
                        .then(() => {
                            fs.unlink(req.file.path, (err) => {
                                if (err) {
                                    req.flash('error', err);
                                }
                            });
                        });
                }
            });

            const changePasswordPromise = new Promise((resolve, reject) => {
                if (!req.body.password ||
                    typeof req.body.password !== 'string' ||
                    req.body.password.length < 6) {
                    return {
                        errorMessage:
                        'Invalid password: length must be atleast 6 symbols!',
                    };
                }

                return data.users.edit(
                    { username: username },
                    {
                        $set: {
                            password:
                            hashPasswordHelper
                                .generateHashedPassword(req.body.password),
                        },
                    });
            });

            Promise.all([
                changeEmailPromise,
                changePicturePromise,
                changePasswordPromise,
            ])
                .then(res.redirect('/user/profile'));
        },
        getMyEventsPage(req, res) {
            const username = res.locals.user.username;

            return Promise.all([
                data.events.getUserJoinedEvents(username),
                data.events.getUserCreatedEvents(username),
            ])
                .then((events) => {
                    if (events) {
                        return res.render('users/my-events',
                            {
                                joinedEvents: events[0],
                                createdEvents: events[1],
                            });
                    }

                    return res.render('users/my-events', {
                        errorMessage:
                        'No events avaible for this user',
                    });
                });
        },
    };
};

module.exports = usersController;
