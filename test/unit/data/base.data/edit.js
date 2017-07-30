const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../../data/base/base.data');

describe('BaseData.edit()', () => {
    let ModelClass = null;
    let data = null;
    let update;
    const validator = null;

    const db = {
        collection: () => { },
    };

    const item = { testModel: 'testModel' };

    ModelClass = class {
    };

    describe('when model is passed as argument', () => {
        beforeEach(() => {
            update = () => {
                return Promise.resolve(item);
            };

            sinon
                .stub(db, 'collection')
                .callsFake(() => {
                    return { update };
                });

            ModelClass.toViewModel = (model) => {
                return model;
            };

            data = new BaseData(db, ModelClass, validator);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect to return the item in viewModel', () => {
            return data
                .edit(item)
                .then((model) => {
                    expect(model).to.deep.equal(item);
                });
        });
    });
});
