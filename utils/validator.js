const validator = {
    // Warning: TODO: Update the validator
    validateUser: (user) => {
        const error = {
            isValid: true,
        };

        if (!user.username ||
            typeof user.username !== 'string' ||
            user.username.length < 4) {
            error.errorMessage =
                'Invalid username: length must be atleast 4 symbols!';
            error.isValid = false;
        }
        if (!user.email ||
            // eslint-disable-next-line
            !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(user.email))) {
            error.errorMessage = 'Incorrect email!';
            error.isValid = false;
        }
        if (!user.password ||
            typeof user.password !== 'string' ||
            user.password.length < 6) {
            error.errorMessage =
                'Invalid password: length must be atleast 6 symbols!';
            error.isValid = false;
        }

        return error;
    },
    isValidEvent: (event) => {

    },
};

module.exports = validator;
