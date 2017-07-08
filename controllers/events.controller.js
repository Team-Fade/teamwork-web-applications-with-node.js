const eventsController = {
    getBrowseEventsPage(req, res) {
        return res.render('events/browse-events');
    },
};

module.exports = eventsController;
