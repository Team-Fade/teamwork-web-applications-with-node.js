class User {
    static isValid(model) {
        console.log(model.password.hasOwnProperty('salt'));
        return typeof model !== 'undefined' &&
            typeof model.username === 'string' &&
            model.username.length > 3 &&
            model.password.hasOwnProperty('salt') &&
            model.password.hasOwnProperty('passwordHash') &&
            typeof model.firstName !== 'undefined' &&
            typeof model.lastName !== 'undefined' &&
            typeof model.city !== 'undefined' &&
            typeof model.email !== 'undefined' &&
            typeof model.profileImage !== 'undefined';
    }

    static toViewModel(model) {
        const viewModel = new User();
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

module.exports = User;
