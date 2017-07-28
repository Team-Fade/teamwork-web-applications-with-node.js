const { expect } = require('chai');
const { init } =
    require('../../../../../app/controllers/events.controller');

describe('events controller', () => {
    let data = null;
    const event = 'testEvent';
    let controller;

    let req = null;
    let res = null;

    describe('if event is found', () => {
        beforeEach(() => {
            const reqOptions = {
                params: { id: 1 },
            };

            data = {
                events: {
                    getOne() {
                        return Promise.resolve(event);
                    },
                },
            };

            controller = init(data);

            req = require('../../../req-res')
                .getRequestMock(reqOptions);
            res = require('../../../req-res')
                .getResponseMock();
        });

        it('expect getManageEventPage() to return items', () => {
            return controller.getManageEventPage(req, res)
                .then((result) => {
                    expect(res.context).to.be.deep
                        .equal({
                            context: event,
                        });
                    expect(res.viewName).to.be
                        .equal('events/manage-event');
                });
        });
    });

    describe('if event is not found', () => {
        beforeEach(() => {
            const reqOptions = {
                params: { id: 1 },
                flash: () => {

                },
            };

            data = {
                events: {
                    getOne() {
                        return Promise.resolve(null);
                    },
                },
            };

            controller = init(data);

            req = require('../../../req-res')
                .getRequestMock(reqOptions);
            res = require('../../../req-res')
                .getResponseMock();
        });

        it('expect getManageEventPage() to redirect to /events/create', () => {
            return controller.getManageEventPage(req, res)
                .then((result) => {
                    expect(res.redirectUrl).to.be.equal('/events/create');
                });
        });
    });
});
