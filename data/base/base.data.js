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

    getOne(filter, options) {
        return this.collection
            .findOne(filter, options)
            .then((item) => {
                return this.modelClass.toViewModel(item);
            })
            .catch((error) => {
                return error;
            });
    }

    getAllItems(filter, options) {
        const result = this.collection
            .find(filter, options)
            .toArray();

        if (this.modelClass.toViewModel) {
            return result.then((models) => {
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
        return this.collection.update(filter, options)
            .then((model) => {
                return this.modelClass.toViewModel(model);
            });
    }
}

// istanbul cover ./node_modules/mocha/bin/_mocha test/unit/**/*.js

module.exports = BaseData;
