const fs = require('fs');

const usersController = (data) => {
    return {
        getProfilePage: (req, res) => {
            if (!res.locals.user) {
                return res.redirect('/');
            }

            const username = res.locals.user.username;

            return data.users
                .getOne({ username: username })
                .then((user) => {
                    if (user.profileImage.encoded) {
                        return res.render('users/profile', {
                            encodedImg: user.profileImage.encoded,
                            user: res.locals.user,
                        });
                    }

                    return res.render('users/profile', {
                        defaultImg: user.profileImage.default,
                        user: res.locals.user,
                    });
                });
        },
        getProfileEditPage: (req, res) => {
            return res.render('users/profile-edit', {
                user: res.locals.user,
            });
        },
        editProfilePage: (req, res) => {
            const username = res.locals.user.username;

            if (req.file) {
                const newImg = fs.readFileSync(req.file.path);

                const image = {
                    contentType: req.file.mimetype,
                    size: req.file.size,
                    encoded: newImg.toString('base64'),
                };

                return data.users.edit(
                    { username: username },
                    { $set: { profileImage: image } })
                    .then(() => {
                        fs.unlink(req.file.path, (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                    })
                    .then(() => {
                        res.redirect('/user/profile');
                    });
            }

            // updatedUser.username = res.locals.user.username;
            // updatedUser.email = res.locals.user.email;

            // data.users.edit({
            //     username: updatedUser.username,
            // }, {
            //         $set: updatedUser,
            //     }, {
            //         new: true,
            //     }).then(() => {
            //         req.logIn(updatedUser, (err) => {
            //             if (err) throw err;
            //             res.redirect('/user/profile');
            //         });
            //     });
        },
    };
};

module.exports = usersController;
