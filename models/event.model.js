class Event {
    static isValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.description === 'string' &&
            model.description.length > 3;

            // Warning: TODO: Extend verification
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
