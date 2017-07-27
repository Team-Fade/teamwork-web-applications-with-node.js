const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.session.passport.user;
        return next();
    }

    req.flash('login', 'You need to be logged in to perform this action!');
    return res.redirect('/login');
};

module.exports = isAuthenticated;
