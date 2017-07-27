const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const { hashPasswordHelper }
    = require('../utils');

const configureAuthentification = (app, { users }) => {
    passport.use(new LocalStrategy(
        (username, password, done) => {
            users.collection
                .findOne({ 'username': username }, (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false,
                            { message: 'Incorrect username.' });
                    }

                    if (!hashPasswordHelper.verifyHashedPassword(
                        password,
                        user.password.salt,
                        user.password.passwordHash)) {
                        return done(null, false,
                            { message: 'Incorrect password.' });
                    }

                    return done(null, user);
                });
        }
    ));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(cookieParser());
    app.use(session({
        secret: 'Purple Unicorn',
        maxAge: new Date(Date.now() + 60 * 60 * 1000),
        resave: false,
        saveUninitialized: false,
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        const sessionUser = {
            _id: user._id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            city: user.city,
            profileImage: user.profileImage.data.value(),
        };
        done(null, sessionUser);
    });

    passport.deserializeUser((sessionUser, done) => {
        done(null, sessionUser);
    });
};

module.exports = configureAuthentification;
