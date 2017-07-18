const validator = {
    // Warning: TODO: Update the validator
    isValidUser: (user) => {
        if (!user.username ||
            typeof user.username !== 'string' ||
            user.username.length < 4) {
            return false;
        }
        if (!user.email ||
            !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(user.email))) {
            return false;
        }
        if (!user.password ||
            typeof user.password !== 'string' ||
            user.password.length < 6) {
            return false;
        }

        return true;
    },
    isValidEvent: (event) => {

    },
};

module.exports = validator;
