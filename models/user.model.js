const VALIDATOR = require('../utils/validator/validator.new');

class User {
    static isValid(model) {
        return VALIDATOR.validateUserModel(model).isValid;
    }

    static toViewModel(model) {
        if (model !== null) {
            const viewModel = new User();
            Object.keys(model)
                .forEach((property) => {
                    viewModel[property] = model[property];
                });

            return viewModel;
        }

        return null;
    }

    get id() {
        return this._id;
    }
}

module.exports = User;
