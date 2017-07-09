class Event {
    // static isValid(model) {
    //     return typeof model !== 'undefined' &&
    //         typeof model.text === 'string' &&
    //         model.text.length > 3;
    // }

    static toViewModel(model) {
        const viewModel = new Event();
        Object.keys(model)
            .forEach((property) => {
                console.log(property);
                viewModel[property] = model[property];
            });

        return viewModel;
    }

    get id() {
        return this._id;
    }
}

module.exports = Event;
