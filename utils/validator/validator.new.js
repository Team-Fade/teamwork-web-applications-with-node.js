const validateUser = require('./helpers/validate.user');
const validateEvent = require('./helpers/validate.event');
const validateRegister = require('./helpers/validate.register');

const VALIDATOR = {
    validateUser: {
        validateUsername: validateUser.validateUsername,
        validateUserPassword: validateUser.validateUserPassword,
    },
    validateRegister: (user) => {
        const error = {
            isValid: true,
            message: '',
        };

        const validateUsername = validateUser
            .validateUsername(user.username, 5, 10);
        const validatePassword = validateUser
            .validateUserPassword(user.password, 5, 10);

        const validateFirstname = validateRegister
            .validateFirstname(user.firstName, 3, 15);
        const validateLastname = validateRegister
            .validateLastname(user.lastName, 3, 15);
        const validateCity = validateRegister
            .validateCity(user.city, 3, 15);
        const validateEmail = validateRegister
            .validateEmail(user.email, 5, 15);

        if (!validateUsername.isValid) {
            error.message = validateUsername.message;
            error.isValid = false;
            return error;
        }

        if (!validatePassword.isValid) {
            error.message = validatePassword.message;
            error.isValid = false;
            return error;
        }

        if (!validateFirstname.isValid) {
            error.message = validateFirstname.message;
            error.isValid = false;
            return error;
        }


        if (!validateLastname.isValid) {
            error.message = validateLastname.message;
            error.isValid = false;
            return error;
        }

        if (!validateCity.isValid) {
            error.message = validateCity.message;
            error.isValid = false;
            return error;
        }


        if (!validateEmail.isValid) {
            error.message = validateEmail.message;
            error.isValid = false;
            return error;
        }

        return error;
    },
    validateEvent: (event) => {
        const error = {
            isValid: true,
            message: '',
        };
        const validateEventName = validateEvent
            .validateEventName(event.eventName, 5, 15);
        const validateEventLocation = validateEvent
            .validateEventLocation(event.eventLocation, 3, 15);
        const validateEventDescription = validateEvent
            .validateEventDescription(event.eventDescription, 5, 20);
        const validateEventType = validateEvent
            .validateEventType(event.eventType, 5, 15);

        if (!validateEventName.isValid) {
            error.message = validateEventName.message;
            error.isValid = false;
            return error;
        }

        if (!validateEventLocation.isValid) {
            error.message = validateEventLocation.message;
            error.isValid = false;
            return error;
        }

        if (!validateEventDescription.isValid) {
            error.message = validateEventDescription.message;
            error.isValid = false;
            return error;
        }

        if (!validateEventType.isValid) {
            error.message = validateEventType.message;
            error.isValid = false;
            return error;
        }

        return error;
    },
    validateUserModel: (model) => {
        const error = {
            isValid: true,
            message: '',
        };

        const validateUsername = validateUser
            .validateUsername(model.username, 5, 15);
        const validateFirstname = validateRegister
            .validateFirstname(model.firstName, 3, 15);
        const validateLastname = validateRegister
            .validateLastname(model.lastName, 3, 15);
        const validateCity = validateRegister
            .validateCity(model.city, 3, 10);
        const validateEmail = validateRegister
            .validateEmail(model.email, 5, 15);

        if (typeof model === 'undefined') {
            error.message = 'Passed model is undefined';
            error.isValid = false;
            return error;
        }

        if (!validateUsername.isValid) {
            error.message = validateUsername.message;
            error.isValid = false;
            return error;
        }

        if (!model.password.hasOwnProperty('salt') ||
            !model.password.hasOwnProperty('passwordHash')) {
            error.message = 'Password not hashed';
            error.isValid = false;
            return error;
        }

        if (typeof model.profileImage !== 'undefined') {
            error.message = 'Profile image not set';
            return error;
        }

        if (!validateFirstname.isValid) {
            error.message = validateFirstname.message;
            error.isValid = false;
            return error;
        }

        if (!validateLastname.isValid) {
            error.message = validateLastname.message;
            error.isValid = false;
            return error;
        }

        if (!validateCity.isValid) {
            error.message = validateCity.message;
            error.isValid = false;
            return error;
        }

        if (!validateEmail.isValid) {
            error.message = validateEmail.message;
            error.isValid = false;
            return error;
        }

        return error;
    },
    validateEventModel: (model) => {
        const error = {
            isValid: true,
            message: '',
        };

        const validateEventName = validateEvent
            .validateEventName(model.eventName, 5, 15);
        const validateEventLocation = validateEvent
            .validateEventLocation(model.eventLocation, 3, 15);
        const validateEventDescription = validateEvent
            .validateEventDescription(model.eventDescription, 5, 20);
        const validateEventType = validateEvent
            .validateEventType(model.eventType, 5, 15);

        if (typeof model === 'undefined') {
            error.message = 'Passed model is undefined';
            error.isValid = false;
            return error;
        }

        if (!validateEventName.isValid) {
            error.message = validateEventName.message;
            error.isValid = false;
            return error;
        }

        if (!validateEventLocation.isValid) {
            error.message = validateEventLocation.message;
            error.isValid = false;
            return error;
        }

        if (!validateEventDescription.isValid) {
            error.message = validateEventDescription.message;
            error.isValid = false;
            return error;
        }

        if (!validateEventType.isValid) {
            error.message = validateEventType.message;
            error.isValid = false;
            return error;
        }

        return error;
    },
};

module.exports = VALIDATOR;
