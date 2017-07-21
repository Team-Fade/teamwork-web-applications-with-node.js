const apiEventsController = ({ events }) => {
    return {
        getEvents(req, res, next) {
            events.groupEvents()
                .then((eventsData) => {
                    res.send(...eventsData);
                });
        },
    };
};

module.exports = apiEventsController;
