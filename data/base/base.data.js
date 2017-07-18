const ObjectId = require('mongodb').ObjectId;

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

    getById(id) {
        // Add error if not found
        return this.collection
            .findOne({ '_id': new ObjectId(id) })
            .then((item) => {
                return this.modelClass.toViewModel(item);
            })
            .catch((error) => {
                return error;
            });
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
        // Add error if not found
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
