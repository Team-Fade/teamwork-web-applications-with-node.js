const apiEventsController = ({ events }) => {
    return {
        getEvents(req, res, next) {
            return events.groupEvents()
                .then((eventsData) => {
                    if (eventsData.length > 0) {
                        return res.send(...eventsData);
                    }

                    return res.send({ errorMessage: 'No events' });
                });
        },
        getAllEvents(req, res) {
            if (res.locals.user) {
                return events.getAllItems()
                    .then((eventsData) => {
                        if (eventsData) {
                            return res.send(
                                {
                                    user: res.locals.user,
                                    events: eventsData,
                                });
                        }

                        return res.send({
                            errorMessage:
                            'No events avaible in this moment',
                        });
                    });
            }

            return res.send({ errorMessage: 'Not authenticated user' });
        },
    };
};

module.exports = apiEventsController;
