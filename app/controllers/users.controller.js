const usersController = {
    getProfilePage: (req, res) => {
        return res.render('users/profile', {
            user: req.user,
        });
    },
};

module.exports = usersController;
