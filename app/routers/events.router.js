const attach = (app, router, data) => {
    const eventsController = require('../controllers/events.controller')(data);

    router
        .get('/browse-events/:id?',
        (res, req, next) => eventsController.getViewEventPage(res, req, next))
        .post('/browse-events/:id',
        (res, req) => eventsController.joinEvent(res, req))
        .get('/browse-events',
        (res, req) => eventsController.getBrowseEventsPage(res, req))
        .get('/create-event',
        (res, req) => eventsController.getCreateEventPage(res, req))
        .post('/create-event',
        (req, res) => {
            eventsController.createEvent(req, res);
        });

    app.use(router);
};

module.exports = {
    attach,
};
