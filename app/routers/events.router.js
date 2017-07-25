const upload = require('../../config/multer.config');

const attach = (app, router, data) => {
    const eventsController = require('../controllers/events.controller')(data);

    router
        .get('/browse',
        (res, req) => eventsController.getBrowseEventsPage(res, req))
        .post('/browse',
        (res, req) => eventsController.getFilteredEvents(res, req))
        .get('/create',
        (res, req) => eventsController.getCreateEventPage(res, req))
        .post('/create', upload.single('eventImage'),
        (req, res) => {
            eventsController.createEvent(req, res);
        })
        .put('/:id/:action', (req, res) =>
            eventsController.joinEvent(req, res))
        .put('/:id/:action', (req, res) =>
            eventsController.leaveEvent(req, res))
        .get('/manage/:id',
        (res, req) => eventsController.getManageEventPage(res, req))
        .post('/manage/:id', upload.single('eventImage'),
        (res, req) => eventsController.editEvent(res, req));

    app.use('/events', router);
};

module.exports = {
    attach,
};
