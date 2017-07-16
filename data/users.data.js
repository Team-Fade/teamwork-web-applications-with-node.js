const BaseData = require('./base/base.data');
const User = require('../models/user.model');
const validator = require('../utils/validator');
const generateHashedPassword
    = require('../utils/hashPassword').generateHashedPassword;

class UsersData extends BaseData {
    constructor(db) {
        super(db, User);
    }

    add(user) {
        if (validator.isValidUser(user)) {
            user.password = generateHashedPassword(user.password);
        }

        return super.add(user);
    }

    findUserByUsername(username) {
        return this.collection.findOne({ 'username': username })
            .then((user) => {
                return user;
            });
    }

    validateUserPassword(username, password, done) {
    }
}

module.exports = UsersData;
