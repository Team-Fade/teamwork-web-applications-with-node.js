const attach = (app, router, data) => {
    const eventsController = require('../controllers/events.controller')(data);

    router
        .get('/browse-events',
        (res, req) => eventsController.getBrowseEventsPage(res, req))
        .post('/browse-events',
        (res, req) => eventsController.getFilteredEvents(res, req))
        .get('/create-event',
        (res, req) => eventsController.getCreateEventPage(res, req))
        .post('/create-event',
        (req, res) => {
            eventsController.createEvent(req, res);
        })
        .post('/event/join-event', (req, res) =>
            eventsController.joinEvent(req, res))
        .post('/event/leave-event', (req, res) =>
            eventsController.leaveEvent(req, res));

    app.use(router);
};

module.exports = {
    attach,
};
