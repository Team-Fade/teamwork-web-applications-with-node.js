const { expect } = require('chai');

const { init } =
    require('../../../../../app/controllers/events.controller');

describe('Controllers tests: ', () => {
    describe('Events controller: ', () => {
        let controller;
        let data = null;
        const events = ['testEvent', 1, 2, 3];
        const user = {

        };

        let req = null;
        let res = null;

        describe('when no query params are passed', () => {
            before(() => {
                const reqOptions = {
                    params: { id: 1 },
                    query: {},
                    session: {
                        passport: { user: {} },
                    },
                };

                data = {
                    events: {
                        getAllItems() {
                            return Promise.resolve(events);
                        },
                    },
                };

                controller = init(data);

                req = require('../../../req-res')
                    .getRequestMock(reqOptions);
                res = require('../../../req-res')
                    .getResponseMock();
            });

            it('expect getBrowseEventsPage() to return items', () => {
                return controller.getBrowseEventsPage(req, res)
                    .then((result) => {
                        expect(res.context).to.be.deep
                            .equal({
                                context: events,
                                user: user,
                            });
                        expect(res.viewName).to.be
                            .equal('events/browse-events');
                    });
            });
        });

        describe('when query params are passed', () => {
            before(() => {
                const reqOptions = {
                    params: { id: 1 },
                    query: { eventName: 'testEvent' },
                    session: {
                        passport: { user: {} },
                    },
                };

                data = {
                    events: {
                        getAllItems() {
                            return Promise.resolve(events);
                        },
                    },
                };

                controller = init(data);

                req = require('../../../req-res')
                    .getRequestMock(reqOptions);
                res = require('../../../req-res')
                    .getResponseMock();
            });

            it('expect getBrowseEventsPage() should use filter array', () => {
                return controller.getBrowseEventsPage(req, res)
                    .then((result) => {
                        expect(res.context).to.be.deep
                            .equal({
                                context: events,
                                user: user,
                            });
                        expect(res.viewName).to.be
                            .equal('events/browse-events');
                    });
            });
        });
    });
});
