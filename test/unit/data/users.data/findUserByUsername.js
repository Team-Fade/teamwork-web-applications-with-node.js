const { expect } = require('chai');
const sinon = require('sinon');

const UsersData = require('../../../../data/users.data');

describe('Data tests: ', () => {
    describe('UsersData.findUserByUsername(): ', () => {
        let User = null;
        let data = null;
        let findOne;

        const db = {
            collection: () => { },
        };

        let user;

        User = class {
        };

        describe('when valid model is passed as argument', () => {
            before(() => {
                user = {
                    username: 'testModel',
                    email: 'test@abv.bg',
                    city: 'testCity',
                    firstName: 'testFirstname',
                    lastName: 'testLastname',
                    password: 'testPassword',
                };

                findOne = () => {
                    return Promise.resolve(user);
                };

                sinon
                    .stub(db, 'collection')
                    .callsFake(() => {
                        return { findOne };
                    });

                User.toViewModel = (model) => {
                    return model;
                };

                User.isValid = (model) => {
                    return true;
                };

                data = new UsersData(db, User);
            });

            after(() => {
                db.collection.restore();
            });

            it('expect to return the item in viewModel', () => {
                return data
                    .findUserByUsername(user)
                    .then((model) => {
                        expect(model).to.deep.equal(user);
                    });
            });
        });
    });
});
