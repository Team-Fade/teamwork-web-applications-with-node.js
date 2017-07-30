const { expect } = require('chai');
const sinon = require('sinon');

const EventsData = require('../../../../data/events.data');

describe('Events.data.getUserCreatedEvents()', () => {
    let Event = null;
    let data = null;
    let find;
    let toArray;

    const db = {
        collection: () => { },
    };

    let events;

    Event = class {
    };

    describe('when filter is passed as argument', () => {
        beforeEach(() => {
            events = [{ eventName: 1 }, { eventName: 2 }];

            toArray = () => {
                return Promise.resolve(events);
            };

            find = () => {
                return {
                    toArray,
                };
            };

            sinon
                .stub(db, 'collection')
                .callsFake(() => {
                    return { find };
                });

            Event.toViewModel = (model) => {
                return model;
            };

            Event.isValid = (model) => {
                return true;
            };

            data = new EventsData(db, Event);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect to return the proper collection to array', () => {
            return data
                .getUserCreatedEvents()
                .then((result) => {
                    expect(result).to.deep.include({ eventName: 1 });
                });
        });
    });
});
