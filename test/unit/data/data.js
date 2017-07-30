const { expect } = require('chai');
const sinon = require('sinon');

const { init } = require('../../../data/data');

describe('Data tests: ', () => {
    describe('data.js: ', () => {
        const db = {
            collection: () => { },
        };

        let data;

        before(() => {
            sinon
                .stub(db, 'collection')
                .callsFake(() => {
                    return {
                        events: '',
                        users: '',
                    };
                });

            data = init(db);

            it('expect to return users and events objects', () => {
                data
                    .then((collections) => {
                        expect(collections).to.deep.include('events');
                    });
            });
        });
    });
});

