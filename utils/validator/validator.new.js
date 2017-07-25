const validateUser = require('./helpers/validate.user');
const VALIDATOR = {
    validateUser: {
        validateUsername: validateUser.validateUsername,
        validateUserPassword: validateUser.validateUserPassword,
    },
};
// console.log(VALIDATOR.validateUser.validateUsername('gosho', 3, 10));
// console.log(VALIDATOR.validateUser.validateUsername('gosho', 7, 10));

module.exports = VALIDATOR;

