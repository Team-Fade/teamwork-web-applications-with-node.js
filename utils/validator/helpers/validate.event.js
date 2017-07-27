const validatorUtils = require('../utils/validator.utils');
const { EVENT_NAME_MUST_BE_STRING } = require('../utils/validator.constants');
const { EVENT_NAME_MUST_BE_IN_RANGE } = require('../utils/validator.constants');
const { EVENT_LOCATION_MUST_BE_STRING } =
    require('../utils/validator.constants');
const { EVENT_LOCATION_MUST_BE_IN_RANGE } =
    require('../utils/validator.constants');
const { EVENT_TYPE_MUST_BE_STRING } = require('../utils/validator.constants');
const { EVENT_TYPE_MUST_BE_IN_RANGE } = require('../utils/validator.constants');
const { EVENT_DESCRIPTION_MUST_BE_STRING } =
    require('../utils/validator.constants');
const { EVENT_DESCRIPTION_MUST_BE_IN_RANGE } =
    require('../utils/validator.constants');


function validateEventName(value, minCharacters, maxCharacters) {
    if (!validatorUtils.isString(value)) {
         return {
             isValid: false,
             message: EVENT_NAME_MUST_BE_STRING,
         };
    }
    if (!validatorUtils.isInRange(value.length,
                                    minCharacters, maxCharacters)) {
        return {
             isValid: false,
             message:
                EVENT_NAME_MUST_BE_IN_RANGE +
                ' ' + minCharacters + ' and ' + maxCharacters + ' symbols.',
         };
    }
    return {
        isValid: true,
    };
}

function validateEventLocation(value, minCharacters, maxCharacters) {
    if (!validatorUtils.isString(value)) {
         return {
             isValid: false,
             message: EVENT_LOCATION_MUST_BE_STRING,
         };
    }
    if (!validatorUtils.isInRange(value.length,
                                    minCharacters, maxCharacters)) {
        return {
             isValid: false,
             message:
                EVENT_LOCATION_MUST_BE_IN_RANGE +
                ' ' + minCharacters + ' and ' + maxCharacters + ' symbols.',
         };
    }
    return {
        isValid: true,
    };
}

function validateEventType(value, minCharacters, maxCharacters) {
    if (!validatorUtils.isString(value)) {
         return {
             isValid: false,
             message: EVENT_TYPE_MUST_BE_STRING,
         };
    }
    if (!validatorUtils.isInRange(value.length,
                                    minCharacters, maxCharacters)) {
        return {
             isValid: false,
             message:
                EVENT_TYPE_MUST_BE_IN_RANGE +
                ' ' + minCharacters + ' and ' + maxCharacters + ' symbols.',
         };
    }
    return {
        isValid: true,
    };
}

function validateEventDescription(value, minCharacters, maxCharacters) {
    if (!validatorUtils.isString(value)) {
         return {
             isValid: false,
             message: EVENT_DESCRIPTION_MUST_BE_STRING,
         };
    }
    if (!validatorUtils.isInRange(value.length,
                                    minCharacters, maxCharacters)) {
        return {
             isValid: false,
             message:
                EVENT_DESCRIPTION_MUST_BE_IN_RANGE +
                ' ' + minCharacters + ' and ' + maxCharacters + ' symbols.',
         };
    }
    return {
        isValid: true,
    };
}


module.exports = {
    validateEventName,
    validateEventLocation,
    validateEventDescription,
    validateEventType,
};
