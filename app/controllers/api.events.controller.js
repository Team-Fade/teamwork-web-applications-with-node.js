const apiEventsController = (data) => {
    return {
        getEvents(req, res, next) {
            return data.events.groupEvents()
                .then((eventsData) => {
                    return res.send(...eventsData);
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
                        return res.send(
                            {
                                user: username,
                                joinedEvents: events[0],
                                createdEvents: events[1],
                            });
                    });
            }

            return res.send({ user: null });
        },
    };
};

module.exports = apiEventsController;
