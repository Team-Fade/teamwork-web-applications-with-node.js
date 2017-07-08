class BaseData {
    constructor(db, modelClass, validator) {
        this.db = db;
        this.modelClass = modelClass;
        this.validator = validator;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    getAll() {
        const filter = {};
        const options = {};

        const result = this.collection
            .find(filter, options)
            .toArray();

        if (this.modelClass.toViewModel) {
            result.then((models) => {
                return models.map((model) =>
                    this.modelClass.toViewModel(model));
            });
        }

        return result;
    }

    create(model) {
        // if (!this._isModelValid(model)) {
        //     return Promise.reject('Invalid model');
        // }

        return this.collection.insert(model)
            .then(() => {
                return this.modelClass.toViewModel(model);
            });
    }

    _getCollectionName() {
        return this.modelClass.name.toLowerCase() + 's';
    }

    // _isModelValid(model) {
    //     return this.validator.isValid(model);
    // }
}

module.exports = BaseData;
