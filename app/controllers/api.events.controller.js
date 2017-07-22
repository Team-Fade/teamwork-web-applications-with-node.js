const apiEventsController = (data) => {
    return {
        getEvents(req, res, next) {
            return data.events.groupEvents()
                .then((eventsData) => {
                    if (eventsData.length > 0) {
                        return res.send(...eventsData);
                    }

                    return res.send({ errorMessage: 'No events' });
                });
        },
        getUserEvents(req, res) {
            if (res.locals.user) {
                const username = res.locals.user.username;
                return Promise.all([
                    data.users.getUserJoinedEvents(username),
                    data.users.getUserCreatedEvents(username),
                ])
                    .then((events) => {
                        if (events) {
                            return res.send(
                                {
                                    joinedEvents: events[0],
                                    createdEvents: events[1],
                                });
                        }

                        return res.send({
                            errorMessage:
                            'No events avaible for this user',
                        });
                    });
            }

            return res.send({ errorMessage: 'Not authenticated user' });
        },
    };
};

module.exports = apiEventsController;
