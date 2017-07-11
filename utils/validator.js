const validator = {
    validateUser: (user) => {
        if (!user.username ||
            typeof user.username !== 'string' ||
            user.username.length < 4) {
            return false;
        }
        if (!user.email ||
            !(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(user.email))) {
            return false;
        }
        if (!user.password ||
            typeof user.password !== 'string' ||
            user.password.length < 6) {
            return false;
        }

        return true;
    },
    validateEvent: (event) => {

    },
};

module.exports = validator;
