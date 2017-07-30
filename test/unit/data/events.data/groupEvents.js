const { expect } = require('chai');
const sinon = require('sinon');

const EventsData = require('../../../../data/events.data');

describe('Data tests: ', () => {
    describe('EventsData.groupEvents(): ', () => {
        let Event = null;
        let data = null;
        let aggregate;
        let toArray;

        const db = {
            collection: () => { },
        };

        let events;

        Event = class {
        };

        describe('when filter is passed as argument', () => {
            before(() => {
                events = [{ eventName: 1 }, { eventName: 2 }];

                toArray = () => {
                    return Promise.resolve(events);
                };

                aggregate = () => {
                    return {
                        toArray,
                    };
                };

                sinon
                    .stub(db, 'collection')
                    .callsFake(() => {
                        return { aggregate };
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

            it('expect to return the proper collection to array', () => {
                return data
                    .groupEvents()
                    .then((result) => {
                        expect(result).to.deep.include({ eventName: 1 });
                    });
            });
        });
    });
});

