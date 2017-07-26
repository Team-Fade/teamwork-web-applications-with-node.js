const { expect } = require('chai');

describe('events controller', () => {
        let eventsController;
        let data = null;
        const events = [1, 2, 3, 4];
        const user = {

        };

        let req = null;
        let res = null;

        beforeEach(() => {
                data = {
                        events: {
                                getAllItems() {
                                        return Promise.resolve(events);
                                },
                        },
                };

                eventsController =
                        require('../../../../../app/controllers/events.controller')(data);
                req = require('../../../req-res').getRequestMock();
                res = require('../../../req-res').getResponseMock();
        });

        it('expect getBrowseEventsPage() to return items', () => {
                return eventsController.getBrowseEventsPage(req, res)
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
