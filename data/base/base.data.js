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
                if (item) {
                    return this.modelClass.toViewModel(item);
                }

                return null;
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
        return this.collection
            .insert(model)
            .then((status) => {
                return this.modelClass.toViewModel(model);
            });
    }

    delete(filter) {
        return this.collection
            .deleteOne(filter)
            .then((result) => {
                return result;
            });
    }

    edit(filter, options) {
        return this.collection.update(filter, options)
            .then((model) => {
                return this.modelClass.toViewModel(model);
            });
    }
}

module.exports = BaseData;
