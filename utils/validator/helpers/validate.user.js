const validatorUtils = require('../utils/validator.utils');
const { USERNAME_MUST_BE_STRING } = require('../utils/validator.constants');
const { USERNAME_MUST_BE_IN_RANGE } = require('../utils/validator.constants');
const { PASSWORD_MUST_BE_STRING } = require('../utils/validator.constants');
const { PASSWORD_MUST_BE_IN_RANGE } = require('../utils/validator.constants');


function validateUsername(value, minCharacters, maxCharacters) {
    if (!validatorUtils.isString(value)) {
        return {
            isValid: false,
            message: USERNAME_MUST_BE_STRING,
        };
    }
    if (!validatorUtils.isInRange(value.length,
        minCharacters, maxCharacters)) {
        return {
            isValid: false,
            message:
            USERNAME_MUST_BE_IN_RANGE +
            ' ' + minCharacters + ' and ' + maxCharacters + ' symbols.',
        };
    }

    return {
        isValid: true,
    };
}

function validateUserPassword(value, minCharacters, maxCharacters) {
    if (!validatorUtils.isString(value)) {
        return {
            isValid: false,
            message: PASSWORD_MUST_BE_STRING,
        };
    }
    if (!validatorUtils.isInRange(value.length,
        minCharacters, maxCharacters)) {
        return {
            isValid: false,
            message:
            PASSWORD_MUST_BE_IN_RANGE +
            ' ' + minCharacters + ' and ' + maxCharacters,
        };
    }

    return {
        isValid: true,
    };
}

module.exports = {
    validateUsername,
    validateUserPassword,
};
