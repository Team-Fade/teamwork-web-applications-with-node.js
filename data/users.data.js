const BaseData = require('./base/base.data');
const User = require('../models/user.model');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User);
    }

     isValidPassword(username, password) {
        this.collection
            .findOne({
                'username': username,
            })
            .then((user) => {
                if (!user) {
                    throw new Error('Invalid user');
                }
                if (user.password !== password) {
                    throw new Error('Invalid password');
                }

                return true;
            });
    }
}

module.exports = UsersData;
