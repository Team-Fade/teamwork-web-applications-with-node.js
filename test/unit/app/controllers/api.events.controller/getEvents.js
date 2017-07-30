const { expect } = require('chai');
const { init } =
    require('../../../../../app/controllers/api.events.controller');

describe('Controllers tests: ', () => {
    describe('Api.events controller: ', () => {
        let controller;
        let data;
        let req = null;
        let res = null;

        describe('if events are available', () => {
            before(() => {
                const eventsData = [
                    { eventName: 1 },
                    { eventName: 2 },
                ];
                data = {
                    events: {
                        groupEvents() {
                            return Promise.resolve(eventsData);
                        },
                    },
                };

                controller = init(data);

                req = require('../../../req-res')
                    .getRequestMock();
                res = require('../../../req-res')
                    .getResponseMock();
            });

            it('expect getEvents() to send correct data', () => {
                controller.getEvents(req, res)
                    .then((result) => {
                        expect(res.body).to.include({ eventName: 1 });
                    });
            });
        });

        describe('if events are not available', () => {
            before(() => {
                const eventsData = [];

                data = {
                    events: {
                        groupEvents() {
                            return Promise.resolve(eventsData);
                        },
                    },
                };

                controller = init(data);

                req = require('../../../req-res')
                    .getRequestMock();
                res = require('../../../req-res')
                    .getResponseMock();
            });

            it('expect getEvents() to send correct data', () => {
                controller.getEvents(req, res)
                    .then(() => {
                        expect(res.body)
                            .to.include({ errorMessage: 'No events' });
                    });
            });
        });
    });
});
