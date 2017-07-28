const VALIDATOR = require('../utils/validator/validator.new');

class Event {
    static isValid(model) {
        return VALIDATOR.validateEventModel(model).isValid;
    }

    static toViewModel(model) {
        const viewModel = new Event();
        Object.keys(model)
            .forEach((property) => {
                viewModel[property] = model[property];
            });

        return viewModel;
    }

    get id() {
        return this._id;
    }
}

module.exports = Event;
