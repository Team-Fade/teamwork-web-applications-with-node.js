const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;

const { init } =
    require('../../../../../app/controllers/events.controller');

describe('Controllers tests: ', () => {
    describe('Events controller: ', () => {
        let controller;
        let data;
        let req = null;
        let res = null;

        describe('if event is not found', () => {
            before(() => {
                data = {
                    events: {
                        getOne() {
                            return Promise.resolve(null);
                        },
                        edit() {

                        },
                    },
                };

                controller = init(data);

                const reqOptions = {
                    body: {
                        eventName: '',
                        eventLocation: '',
                        eventType: '',
                        eventDescription: '',
                    },
                    file: {
                        path: 'public/uploads/default-event.jpg',
                    },
                    headers: {
                        referer: '/test/test/597b7b477a7e302080f29857',
                    },
                    flash: () => {

                    },
                };

                req = require('../../../req-res')
                    .getRequestMock(reqOptions);
                res = require('../../../req-res')
                    .getResponseMock();
            });

            it(`expect editEvent() 
            to redirect to /user/profile/my-events`, () => {
                    controller.editEvent(req, res)
                        .then(() => {
                            expect(res.redirectUrl).to.be
                                .equal('/user/profile/my-events');
                        });
                });
        });

        describe('if event is found', () => {
            before(() => {
                const event = {
                    eventName: 'newEvent',
                };

                data = {
                    events: {
                        getOne() {
                            return Promise.resolve(event);
                        },
                        edit() {

                        },
                    },
                };

                controller = init(data);

                const reqOptions = {
                    body: {
                        eventName: '',
                        eventLocation: '',
                        eventType: '',
                        eventDescription: '',
                    },
                    headers: {
                        referer: '/test/test/597b7b477a7e302080f29857',
                    },
                    flash: () => {

                    },
                };

                req = require('../../../req-res')
                    .getRequestMock(reqOptions);
                res = require('../../../req-res')
                    .getResponseMock();
            });

            it(`expect editEvent() 
            to redirect to /user/profile/my-events`, () => {
                    return controller.editEvent(req, res)
                        .then((result) => {
                            expect(res.redirectUrl).to.be
                                .equal('/user/profile/my-events');
                        });
                });
        });
    });
});

