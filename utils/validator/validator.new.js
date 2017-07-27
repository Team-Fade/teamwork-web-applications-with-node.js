const validateUser = require('./helpers/validate.user');
const validateEvent = require('./helpers/validate.event');
const validateRegister = require('./helpers/validate.register');


const VALIDATOR = {
    validateUser: {
        validateUsername: validateUser.validateUsername,
        validateUserPassword: validateUser.validateUserPassword,
    },
    validateRegister: {
        validateUsername: validateUser.validateUsername,
        validateUserPassword: validateUser.validateUserPassword,
        validateFirstname: validateRegister.validateFirstname,
        validateLastname: validateRegister.validateLastname,
        validateCity: validateRegister.validateCity,
        validateEmail: validateRegister.validateEmail,
    },
    validateEvent: {
        validateEventName: validateEvent.validateEventName,
        validateEventLocation: validateEvent.validateEventLocation,
        validateEventDescription: validateEvent.validateEventDescription,
        validateEventType: validateEvent.validateEventType,
    },
};
// console.log(VALIDATOR.validateUser.validateUsername('gosho', 3, 10));
// console.log(VALIDATOR.validateUser.validateUsername('gosho', 7, 10));

module.exports = VALIDATOR;

