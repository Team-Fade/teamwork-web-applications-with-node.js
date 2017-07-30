const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../../data/base/base.data');

describe('BaseData.delete()', () => {
    let ModelClass = null;
    let data = null;
    let deleteOne;
    const validator = null;

    const db = {
        collection: () => { },
    };

    const item = { testModel: 'testModel' };

    ModelClass = class {
    };

    describe('when filter is passed as argument', () => {
        beforeEach(() => {
            deleteOne = () => {
                return Promise.resolve(item);
            };

            sinon
                .stub(db, 'collection')
                .callsFake(() => {
                    return { deleteOne };
                });

            ModelClass.toViewModel = (model) => {
                return model;
            };

            data = new BaseData(db, ModelClass, validator);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect result to contain the passed item', () => {
            return data
                .delete({ testModel: 'testModel' })
                .then((result) => {
                    expect(result).to.deep.include(item);
                });
        });
    });
});
