const passport = require('passport');
const { Strategy } = require('passport-local');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const { isAuthenticated } = require('../utils');
const { hashPasswordHelper }
    = require('../utils');

const configureAuthentification = (app, { users }) => {
    passport.use(new Strategy(
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

    // Need to generate session key, add in db and change it on every log

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(cookieParser());
    app.use(session({
        secret: 'Purple Unicorn',
        maxAge: new Date(Date.now() + 60 * 60 * 1000),
        resave: false,
        saveUninitialized: false,
        store: new MongoStore(
            {
                url: 'mongodb://localhost/nodejs-teamwork',
            },
            (err) => {
                console.log(err || 'connect-mongodb setup ok');
            }),
    }));

    passport.serializeUser((user, done) => {
        const userInfo = {
            id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            city: user.city,
            email: user.email,
        };
        done(null, userInfo);
    });

    passport.deserializeUser((id, done) => {
        users.collection.findOne({ '_id': id }, (err, user) => {
            done(err, user);
        });
    });

    app.use(isAuthenticated);
};

module.exports = configureAuthentification;
