const passport = require('passport');

const authenticationController = (data) => {
    return {
        register(req, res) {
            const user = req.body;

            // Validate item

            return data.users.create(user)
                .then((dbItem) => {
                    return res.redirect('/' + dbItem.id);
                })
                .catch((err) => {
                    // connect-flash
                    req.flash('error', err);
                    console.log(err);
                    return res.redirect('/error');
                });
            // passport.authenticate('local', {
            //     successRedirect: '/',
            //     failureRedirect: '/register',
            //     failureFlash: true,
            // });
        },
    };
};

module.exports = authenticationController;
