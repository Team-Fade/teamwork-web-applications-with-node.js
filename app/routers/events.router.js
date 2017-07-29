const upload = require('../../config/multer.config');
const isAuthenticated = require('../../utils/isAuthenticated');

const attach = (app, router, data) => {
    const eventsController =
        require('../controllers/events.controller').init(data);

    router
        .get('/browse',
        (res, req) => eventsController.getBrowseEventsPage(res, req))
        .get('/create', isAuthenticated,
        (res, req) => eventsController.getCreateEventPage(res, req))
        .post('/create', isAuthenticated, upload.single('eventImage'),
        (req, res) => eventsController.createEvent(req, res))
        .put('/:id/:action', isAuthenticated,
        [eventsController.joinEvent, eventsController.leaveEvent])
        .get('/manage/:id', isAuthenticated,
        (res, req) => eventsController.getManageEventPage(res, req))
        .post('/manage/:id', isAuthenticated, upload.single('eventImage'),
        (res, req) => eventsController.editEvent(res, req));

    app.use('/events', router);
};

module.exports = {
    attach,
};
