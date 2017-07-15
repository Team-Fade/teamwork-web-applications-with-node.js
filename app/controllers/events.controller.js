const eventsController = {
    getBrowseEventsPage(req, res) {
        return res.render('events/browse-events');
    },
    getCreateEventPage(req, res) {
        return res.render('events/create-event');
    },
};

module.exports = eventsController;
