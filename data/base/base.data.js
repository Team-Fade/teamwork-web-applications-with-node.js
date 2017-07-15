class BaseData {
    constructor(db, modelClass, validator) {
        this.db = db;
        this.modelClass = modelClass;
        this.validator = validator;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    _getCollectionName() {
        return this.modelClass.name.toLowerCase() + 's';
    }

    getAll(filter, options) {
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

    add(model) {
        return this.collection.insert(model)
            .then(() => {
                return this.modelClass.toViewModel(model);
            });
    }

    edit(filter, options) {
        return this.collection.findOneAndUpdate(filter, options, {
                new: true,
            })
            .then((model) => {
                return this.modelClass.toViewModel(model);
            });
    }
}

module.exports = BaseData;
