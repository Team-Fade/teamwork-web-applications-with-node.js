const crypto = require('crypto');

const genRandomString = (length) => {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};

const sha512 = (password, key) => {
    const hash = crypto.createHmac('sha512', key);
    hash.update(password);
    const value = hash.digest('hex');

    return {
        key: key,
        passwordHash: value,
    };
};

const generateHashedPassword = (userPassword) => {
    const key = genRandomString(16);
    const passwordData = sha512(userPassword, key);

    return passwordData;
};

const verifyHashedPassword = (inputPassword, key, hashedPasswordInDatabase) => {
    const loggingHashedPassword = sha512(inputPassword, key).passwordHash;

    if (loggingHashedPassword === hashedPasswordInDatabase) {
        return true;
    }

    return false;
};

module.exports = {
    generateHashedPassword,
    verifyHashedPassword,
};
