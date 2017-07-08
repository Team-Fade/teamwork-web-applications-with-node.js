const passport = require('passport');
const { Strategy } = require('passport-local');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const configureAuthentification = (app) => {
    passport.use(new Strategy(
        (username, password, done) => {

        }
    ));

    app.use(cookieParser());
    app.use(session({ secret: 'Purple Unicorn' }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {

    });
};

module.exports = {
    configureAuthentification,
};
