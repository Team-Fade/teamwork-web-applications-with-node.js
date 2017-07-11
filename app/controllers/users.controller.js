const usersController = {
    getProfilePage: (req, res) => {
        return res.render('users/profile', {
            user: res.locals.user,
        });
    },
};

module.exports = usersController;
