const { expect } = require('chai');
const { init } =
    require('../../../../../app/controllers/users.controller');

describe('users controller', () => {
    let controller;
    let data = null;
    let req = null;
    let res = null;

    describe('if user is logged in and there are user available events', () => {
        beforeEach(() => {
            const events = [{ eventName: 1 }, { eventName: 2 }];

            data = {
                events: {
                    getUserJoinedEvents() {
                        return Promise.resolve(events);
                    },
                    getUserCreatedEvents() {
                        return Promise.resolve(events);
                    },
                },
            };

            controller = init(data);

            req = require('../../../req-res')
                .getRequestMock();
            res = require('../../../req-res')
                .getResponseMock();

            res.locals.user.username = 'testUser';
        });

        it('expect getMyEventsPage() to render users/my-events with the events', () => {
            return controller.getMyEventsPage(req, res)
                .then((result) => {
                    expect(res.viewName).to.be
                        .equal('users/my-events');
                    expect(res.context.context.joinedEvents).to.deep.include(
                        { eventName: 1 }
                    );
                });
        });
    });

    describe('if user is logged in but there are no user available events', () => {
        beforeEach(() => {
            data = {
                events: {
                    getUserJoinedEvents() {
                        return Promise.resolve([]);
                    },
                    getUserCreatedEvents() {
                        return Promise.resolve([]);
                    },
                },
            };

            const reqOptions = {
                flash: () => {

                },
            };

            controller = init(data);

            req = require('../../../req-res')
                .getRequestMock(reqOptions);
            res = require('../../../req-res')
                .getResponseMock();

            res.locals.user.username = 'testUser';
        });

        it('expect getMyEventsPage() to render users/my-events with empty context', () => {
            return controller.getMyEventsPage(req, res)
                .then((result) => {
                    expect(res.viewName).to.be
                        .equal('users/my-events');
                    expect(res.context.context).to
                        .not.have.deep.property('joinedEvents');
                });
        });
    });
});
