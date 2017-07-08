const { Router } = require('express');
const eventsController = require('../controllers/events.controller');

const attachEvents = (app) => {
    const router = new Router();

     router
        .get('/browse-events',
            (res, req) => eventsController.getBrowseEventsPage(res, req));
    app.use(router);
};

module.exports = attachEvents;
