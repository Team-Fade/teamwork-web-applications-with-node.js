const crypto = require('crypto');

const genRandomString = (length) => {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};

const sha512 = (password, salt) => {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const value = hash.digest('hex');

    return {
        salt: salt,
        passwordHash: value,
    };
};

const generateHashedPassword = (userPassword) => {
    const salt = genRandomString(16);
    const passwordData = sha512(userPassword, salt);

    return passwordData;
};

const verifyHashedPassword =
    (inputPassword, salt, hashedPasswordInDatabase) => {
        const loggingHashedPassword = sha512(inputPassword, salt).passwordHash;

        if (loggingHashedPassword === hashedPasswordInDatabase) {
            return true;
        }

        return false;
    };

module.exports = {
    generateHashedPassword,
    verifyHashedPassword,
};
