function isString(value) {
    if (typeof value !== 'string' || value === '' || value === null) {
        return false;
    }
    return true;
}

function isNumber(value) {
    if (typeof Number.parseInt(value, 10) !== 'number'
        || Number.isNaN(value) || value === null) {
        return false;
    }
    return true;
}

function isInRange(value, start, end) {
    if (value < start || value > end) {
        return false;
    }
    return true;
}

function isEmail(value) {
    const atIndex = value.indexOf('@');
    if (atIndex < 1) {
        return false;
    }
    if (value.substring(atIndex, value.length).indexOf('.') < 1) {
        return false;
    }
    return true;
}

module.exports = {
    isNumber,
    isString,
    isInRange,
    isEmail,
};
