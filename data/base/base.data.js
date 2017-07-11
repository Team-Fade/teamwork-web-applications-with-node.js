const generateHashedPassword = require('../../utils/hashPassword').generateHashedPassword

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
        if (model.password !== null) {
            model.password = generateHashedPassword(model.password);
        }
        return this.collection.insert(model)
            .then(() => {
                return this.modelClass.toViewModel(model);
            });
    }
}

module.exports = BaseData;
