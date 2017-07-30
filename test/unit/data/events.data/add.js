const { expect } = require('chai');
const sinon = require('sinon');

const EventsData = require('../../../../data/events.data');

describe('Data tests: ', () => {
    describe('EventsData.add(): ', () => {
        let Event = null;
        let data = null;
        let insert;

        const db = {
            collection: () => { },
        };

        let event;

        Event = class {
        };

        describe('when valid model is passed as argument', () => {
            before(() => {
                event = {
                    eventName: 'testEvent',
                    eventLocation: 'testEvent',
                    eventDescription: 'testEvent',
                    eventType: 'testEvent',
                };

                insert = () => {
                    return Promise.resolve(event);
                };

                sinon
                    .stub(db, 'collection')
                    .callsFake(() => {
                        return { insert };
                    });

                Event.toViewModel = (model) => {
                    return model;
                };

                Event.isValid = (model) => {
                    return true;
                };

                data = new EventsData(db, Event);
            });

            after(() => {
                db.collection.restore();
            });

            it('expect to return the item in viewModel', () => {
                return data
                    .add(event)
                    .then((model) => {
                        expect(model).to.deep.equal(event);
                    });
            });
        });

        describe('when invalid model is passed as argument', () => {
            before(() => {
                event = {
                    eventName: 'testEvent'.repeat(5),
                    eventLocation: 'testEvent',
                    eventDescription: 'testEvent',
                    eventType: 'testEvent',
                };

                insert = () => {
                    return Promise.resolve(event);
                };

                sinon
                    .stub(db, 'collection')
                    .callsFake(() => {
                        return { insert };
                    });

                Event.toViewModel = (model) => {
                    return model;
                };

                Event.isValid = (model) => {
                    return true;
                };

                data = new EventsData(db, Event);
            });

            after(() => {
                db.collection.restore();
            });

            it('expect to return null', () => {
                return data
                    .add(event)
                    .then((model) => {
                        expect(model).to.deep.equal(null);
                    });
            });
        });
    });
});
