const BaseData = require('./base/base.data');
const User = require('../models/user.model');
const { validator } = require('../utils');
const { hashPasswordHelper } = require('../utils');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User);
    }

    add(user) {
        if (validator.validateUser(user)) {
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

    getUserJoinedEvents(username) {
        return this.collection.findOne({ 'username': username })
            .then((user) => {
                return user.joinedEvents;
            });
    }

    getUserCreatedEvents(username) {
        return this.collection.findOne({ 'username': username })
            .then((user) => {
                return user.createdEvents;
            });
    }
}

module.exports = UsersData;
