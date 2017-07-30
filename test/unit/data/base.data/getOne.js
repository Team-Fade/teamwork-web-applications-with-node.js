const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../../data/base/base.data');

describe('Data tests: ', () => {
    describe('BaseData.getOne(): ', () => {
        let ModelClass = null;
        let data = null;
        let findOne;
        const validator = null;

        const db = {
            collection: () => { },
        };

        const item = { testModel: 'testModel' };

        ModelClass = class {
        };

        describe('when there is an item in db', () => {
            before(() => {
                findOne = () => {
                    return Promise.resolve(item);
                };

                sinon
                    .stub(db, 'collection')
                    .callsFake(() => {
                        return { findOne };
                    });

                ModelClass.toViewModel = (model) => {
                    return model;
                };

                data = new BaseData(db, ModelClass, validator);
            });

            after(() => {
                db.collection.restore();
            });

            it('expect to return the item in viewModel', () => {
                return data
                    .getOne()
                    .then((model) => {
                        expect(model).to.deep.equal(item);
                    });
            });
        });

        describe('when there is no item in db', () => {
            before(() => {
                findOne = () => {
                    return Promise.resolve();
                };

                sinon
                    .stub(db, 'collection')
                    .callsFake(() => {
                        return { findOne };
                    });

                ModelClass.toViewModel = () => {
                    return null;
                };

                data = new BaseData(db, ModelClass, validator);
            });

            after(() => {
                db.collection.restore();
            });

            it('expect to return null', () => {
                return data
                    .getOne()
                    .then((model) => {
                        expect(model).to.deep.equal(null);
                    });
            });
        });

        describe('when there is error', () => {
            before(() => {
                findOne = () => {
                    return Promise.reject('Error');
                };

                sinon
                    .stub(db, 'collection')
                    .callsFake(() => {
                        return { findOne };
                    });

                ModelClass.toViewModel = () => {
                    return null;
                };

                data = new BaseData(db, ModelClass, validator);
            });

            after(() => {
                db.collection.restore();
            });

            it('expect to catch error', () => {
                return data
                    .getOne()
                    .catch((error) => {
                        expect(error).to.deep.equal('Error');
                    });
            });
        });
    });
});
