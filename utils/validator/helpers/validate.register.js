const validatorUtils = require('../utils/validator.utils');
const { FIRSTNAME_MUST_BE_STRING } = require('../utils/validator.constants');
const { FIRSTNAME_MUST_BE_IN_RANGE } = require('../utils/validator.constants');
const { LASTNAME_MUST_BE_STRING } = require('../utils/validator.constants');
const { LASTNAME_MUST_BE_IN_RANGE } = require('../utils/validator.constants');
const { CITY_MUST_BE_STRING } = require('../utils/validator.constants');
const { CITY_MUST_BE_IN_RANGE } = require('../utils/validator.constants');
const { INVALID_EMAIL } = require('../utils/validator.constants');


function validateFirstname(value, minCharacters, maxCharacters) {
    if (!validatorUtils.isString(value)) {
         return {
             isValid: false,
             message: FIRSTNAME_MUST_BE_STRING,
         };
    }
    if (!validatorUtils.isInRange(value.length,
                                    minCharacters, maxCharacters)) {
        return {
             isValid: false,
             message:
                FIRSTNAME_MUST_BE_IN_RANGE +
                ' ' + minCharacters + ' and ' + maxCharacters + ' symbols.',
         };
    }
    return {
        isValid: true,
    };
}

function validateLastname(value, minCharacters, maxCharacters) {
    if (!validatorUtils.isString(value)) {
         return {
             isValid: false,
             message: LASTNAME_MUST_BE_STRING,
         };
    }
    if (!validatorUtils.isInRange(value.length,
                                    minCharacters, maxCharacters)) {
        return {
             isValid: false,
             message:
                LASTNAME_MUST_BE_IN_RANGE +
                ' ' + minCharacters + ' and ' + maxCharacters + ' symbols.',
         };
    }
    return {
        isValid: true,
    };
}

function validateCity(value, minCharacters, maxCharacters) {
    if (!validatorUtils.isString(value)) {
         return {
             isValid: false,
             message: CITY_MUST_BE_STRING,
         };
    }
    if (!validatorUtils.isInRange(value.length,
                                    minCharacters, maxCharacters)) {
        return {
             isValid: false,
             message:
                CITY_MUST_BE_IN_RANGE +
                ' ' + minCharacters + ' and ' + maxCharacters + ' symbols.',
         };
    }
    return {
        isValid: true,
    };
}

function validateEmail(value, minCharacters, maxCharacters) {
    if (!validatorUtils.isEmail(value)) {
         return {
             isValid: false,
             message: INVALID_EMAIL,
         };
    }
    return {
        isValid: true,
    };
}

module.exports = {
    validateFirstname,
    validateLastname,
    validateCity,
    validateEmail,
};
