const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../../data/base/base.data');

describe('Data tests: ', () => {
    describe('BaseData.add(): ', () => {
        let ModelClass = null;
        let data = null;
        let insert;
        const validator = null;

        const db = {
            collection: () => { },
        };

        const item = { testModel: 'testModel' };

        ModelClass = class {
        };

        describe('when model is passed as argument', () => {
            before(() => {
                insert = () => {
                    return Promise.resolve(item);
                };

                sinon
                    .stub(db, 'collection')
                    .callsFake(() => {
                        return { insert };
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
                    .add(item)
                    .then((model) => {
                        expect(model).to.deep.equal(item);
                    });
            });
        });
    });
});

