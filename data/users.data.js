const BaseData = require('./base/base.data');
const User = require('../models/user.model');
const VALIDATOR = require('../utils/validator/validator.new');
const { hashPasswordHelper } = require('../utils');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User);
    }

    add(user) {
        if (VALIDATOR.validateRegister(user)) {
            user.password =
                hashPasswordHelper.generateHashedPassword(user.password);

            if (User.isValid(user)) {
                return super.add(user);
            }
        }

        // Warning: TODO: We should return properly error message
        return super.add(null);
    }

    findUserByUsername(username) {
        return this.collection.findOne({ 'username': username })
            .then((user) => {
                return user;
            });
    }
}

module.exports = UsersData;
