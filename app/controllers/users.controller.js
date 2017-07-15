const usersController = (data) => {
    return {
        getProfilePage: (req, res) => {
            return res.render('users/profile', {
                user: res.locals.user,
            });
        },
        getProfileEditPage: (req, res) => {
            return res.render('users/profile-edit', {
                user: res.locals.user,
            });
        },
        editProfilePage: (req, res) => {
            const updatedUser = req.body;

            updatedUser.username = res.locals.user.username;
            updatedUser.email = res.locals.user.email;

            data.users.edit({
                username: updatedUser.username,
            }, {
                $set: updatedUser,
            }, {
                new: true,
            }).then((userData) => {
                req.logIn(userData.value, (err) => {
                    if (err) throw err;
                    res.redirect('/user/profile');
                });
            });
        },
    };
};

module.exports = usersController;
