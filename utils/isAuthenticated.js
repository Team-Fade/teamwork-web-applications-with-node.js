module.exports = (req, res, next) => {
    if (typeof req.session.passport !== 'undefined' &&
        req.session.passport.user) {
        req.user = req.session.passport.user;
    }

    next();
};
