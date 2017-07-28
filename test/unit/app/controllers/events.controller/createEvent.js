const { expect } = require('chai');
const { init } =
    require('../../../../../app/controllers/events.controller');

describe('events controller: ', () => {
    let controller;
    let data;
    let req = null;
    let res = null;
    let event;

    describe('if invalid event is passed', () => {
        beforeEach(() => {
            event = {};

            data = {
                events: {
                    getOne() {
                        return Promise.resolve(event);
                    },
                },
            };

            controller = init(data);

            const reqOptions = {
                body: {
                    event: event,
                },
                flash: () => {

                },
            };

            req = require('../../../req-res')
                .getRequestMock(reqOptions);
            res = require('../../../req-res')
                .getResponseMock();
        });

        it('expect getCreateEventPage() to call validator', () => {
            controller.createEvent(req, res);
            expect(res.redirectUrl).to.be.equal('/events/create');
        });
    });

    describe('if valid event is passed', () => {
        beforeEach(() => {
            event = {
                eventName: 't'.repeat(6),
                eventLocation: 't'.repeat(6),
                eventType: 't'.repeat(6),
                eventDescription: 't'.repeat(6),
            };

            data = {
                events: {
                    getOne() {
                        return Promise.resolve(event);
                    },
                },
            };

            controller = init(data);

            const reqOptions = {
                body: {
                    eventName: 't'.repeat(6),
                    eventLocation: 't'.repeat(6),
                    eventType: 't'.repeat(6),
                    eventDescription: 't'.repeat(6),
                },
                file: {},
                flash: () => {

                },
            };

            req = require('../../../req-res')
                .getRequestMock(reqOptions);
            res = require('../../../req-res')
                .getResponseMock();
        });

        it('expect getCreateEventPage() redirect if that event already exists', () => {
            return controller.createEvent(req, res)
                .then(() => {
                    expect(res.redirectUrl).to.be.equal('/create');
                });
        });
    });

    describe('if valid event is passed', () => {
        beforeEach(() => {
            event = {
                eventName: 't'.repeat(6),
                eventLocation: 't'.repeat(6),
                eventType: 't'.repeat(6),
                eventDescription: 't'.repeat(6),
            };

            data = {
                events: {
                    getOne() {
                        return Promise.resolve();
                    },
                    add() {
                        return Promise.resolve(event);
                    },
                },
            };

            controller = init(data);

            const reqOptions = {
                body: {
                    eventName: 't'.repeat(6),
                    eventLocation: 't'.repeat(6),
                    eventType: 't'.repeat(6),
                    eventDescription: 't'.repeat(6),
                },
                file: {
                    path: 'public/uploads/default-event.jpg',
                },
                flash: () => {

                },
            };

            req = require('../../../req-res')
                .getRequestMock(reqOptions);
            res = require('../../../req-res')
                .getResponseMock();
        });

        it('expect getCreateEventPage() to set image', () => {
            return controller.createEvent(req, res)
                .then(() => {
                    expect(event).to.not.have.property('eventImage');
                });
        });
    });

    describe('if valid event is passed', () => {
        beforeEach(() => {
            event = {
                eventName: 't'.repeat(6),
                eventLocation: 't'.repeat(6),
                eventType: 't'.repeat(6),
                eventDescription: 't'.repeat(6),
            };

            data = {
                events: {
                    getOne() {
                        return Promise.resolve();
                    },
                    add() {
                        return Promise.resolve(event);
                    },
                },
            };

            controller = init(data);

            const reqOptions = {
                body: {
                    eventName: 't'.repeat(6),
                    eventLocation: 't'.repeat(6),
                    eventType: 't'.repeat(6),
                    eventDescription: 't'.repeat(6),
                },
                file: {
                    path: 'public/uploads/default-event.jpg',
                },
                flash: () => {

                },
            };

            req = require('../../../req-res')
                .getRequestMock(reqOptions);
            res = require('../../../req-res')
                .getResponseMock();
        });

        it('expect getCreateEventPage() to redirect to /profile on success', () => {
            return controller.createEvent(req, res)
                .then((result) => {
                    expect(res.redirectUrl).to.be.equal('/profile');
                });
        });
    });
});
