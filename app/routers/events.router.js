const upload = require('../../config/multer.config');

const attach = (app, router, data) => {
    const eventsController = require('../controllers/events.controller')(data);

    router
        .get('/browse-events',
        (res, req) => eventsController.getBrowseEventsPage(res, req))
        .post('/browse-events',
        (res, req) => eventsController.getFilteredEvents(res, req))
        .get('/create-event',
        (res, req) => eventsController.getCreateEventPage(res, req))
        .post('/create-event', upload.single('eventImage'),
        (req, res) => {
            eventsController.createEvent(req, res);
        })
        .post('/event/join-event', (req, res) =>
            eventsController.joinEvent(req, res))
        .post('/event/leave-event', (req, res) =>
            eventsController.leaveEvent(req, res))
        .get('/event/manage-event/:id',
        (res, req) => eventsController.getManageEventPage(res, req))
        .post('/event/manage-event/:id?', upload.single('eventImage'),
        (res, req) => eventsController.editEvent(res, req));

    app.use(router);
};

module.exports = {
    attach,
};
