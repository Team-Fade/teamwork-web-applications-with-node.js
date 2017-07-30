const { expect } = require('chai');
const { init } =
    require('../../../../../app/controllers/api.events.controller');

describe('Controllers tests: ', () => {
    describe('Api.events controller: ', () => {
        let controller;
        let data;
        let req = null;
        let res = null;

        describe('if user is authenticated', () => {
            before(() => {
                const eventsData = [
                    { eventName: 1 },
                    { eventName: 2 },
                ];
                data = {
                    events: {
                        getAllItems() {
                            return Promise.resolve(eventsData);
                        },
                    },
                };

                const reqOptions = {
                    session: { passport: { user: 'testUser' } },
                };

                controller = init(data);

                req = require('../../../req-res')
                    .getRequestMock(reqOptions);
                res = require('../../../req-res')
                    .getResponseMock();
            });

            it('expect getAllEvents() to send correct data', () => {
                return controller.getAllEvents(req, res)
                    .then(() => {
                        expect(res.body.events)
                            .to.deep.include({ eventName: 1 });
                    });
            });
        });

        describe(`if user is authenticated 
        but there are not available events`, () => {
                before(() => {
                    data = {
                        events: {
                            getAllItems() {
                                return Promise.resolve(null);
                            },
                        },
                    };

                    const reqOptions = {
                        session: { passport: { user: 'testUser' } },
                    };

                    controller = init(data);

                    req = require('../../../req-res')
                        .getRequestMock(reqOptions);
                    res = require('../../../req-res')
                        .getResponseMock();
                });

                it(`expect getAllEvents() 
                to send correct error message`, () => {
                        return controller.getAllEvents(req, res)
                            .then(() => {
                                expect(res.body).to.deep.include({
                                    errorMessage:
                                    'No events avaible in this moment',
                                });
                            });
                    });
            });

        describe('if user is not authenticated', () => {
            before(() => {
                data = {
                    events: {
                        getAllItems() {
                            return Promise.resolve();
                        },
                    },
                };

                const reqOptions = {
                    session: {},
                };

                controller = init(data);

                req = require('../../../req-res')
                    .getRequestMock(reqOptions);
                res = require('../../../req-res')
                    .getResponseMock();
            });

            it('expect getAllEvents() to send correct error message', () => {
                controller.getAllEvents(req, res);
                expect(res.body).to.deep
                    .include({ errorMessage: 'Not authenticated user' });
            });
        });
    });
});
