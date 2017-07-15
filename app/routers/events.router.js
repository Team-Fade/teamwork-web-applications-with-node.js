const eventsController = require('../controllers/events.controller');

const attach = (app, router, data) => {
    router
        .get('/browse-events',
            (res, req) => eventsController.getBrowseEventsPage(res, req))
        .get('/create-event',
            (res, req) => eventsController.getCreateEventPage(res, req));

    app.use(router);
};

module.exports = {
    attach,
};
