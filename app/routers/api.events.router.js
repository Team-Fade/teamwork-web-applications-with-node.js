const attach = (app, router, data) => {
    const apiEventsController =
        require('../controllers/api.events.controller')(data);

    router
        .get('/api/filter-events', (req, res) =>
            apiEventsController.getEvents(req, res))
        .get('/api/events', (req, res) =>
            apiEventsController.getAllEvents(req, res));

    app.use(router);
};

module.exports = {
    attach,
};
