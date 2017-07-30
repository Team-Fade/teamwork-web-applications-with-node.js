const { expect } = require('chai');
const sinon = require('sinon');

const UsersData = require('../../../../data/users.data');

describe('Users.data.add()', () => {
    let User = null;
    let data = null;
    let insert;

    const db = {
        collection: () => { },
    };

    let user;

    User = class {
    };

    describe('when valid model is passed as argument', () => {
        beforeEach(() => {
            user = {
                username: 'testModel',
                email: 'test@abv.bg',
                city: 'testCity',
                firstName: 'testFirstname',
                lastName: 'testLastname',
                password: 'testPassword',
            };

            insert = () => {
                return Promise.resolve(user);
            };

            sinon
                .stub(db, 'collection')
                .callsFake(() => {
                    return { insert };
                });

            User.toViewModel = (model) => {
                return model;
            };

            User.isValid = (model) => {
                return true;
            };

            data = new UsersData(db, User);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect to return the item in viewModel', () => {
            return data
                .add(user)
                .then((model) => {
                    expect(model).to.deep.equal(user);
                });
        });
    });

    describe('when valid model is passed as argument', () => {
        beforeEach(() => {
            user = {
                username: 'testModel',
                email: 'test',
                city: 'testCity',
                firstName: 'testFirstname',
                lastName: 'testLastname',
                password: 'testPassword',
            };

            insert = () => {
                return Promise.resolve(user);
            };

            sinon
                .stub(db, 'collection')
                .callsFake(() => {
                    return { insert };
                });

            User.toViewModel = (model) => {
                return model;
            };

            User.isValid = (model) => {
                return true;
            };

            data = new UsersData(db, User);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect to return null', () => {
            return data
                .add(user)
                .then((model) => {
                    expect(model).to.deep.equal(null);
                });
        });
    });
});
