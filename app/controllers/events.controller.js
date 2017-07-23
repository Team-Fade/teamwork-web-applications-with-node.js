const eventsController = (data) => {
    return {
        getBrowseEventsPage(req, res) {
            return data.events.getAllItems({}, {})
                .then((events) => {
                    if (events) {
                        return res.render('events/browse-events',
                            { events: events });
                    }

                    return res.send({ errorMessage: 'No events avaible' });
                });
        },
        getFilteredEvents(req, res) {
            const event = req.body;

            const filterArray = [];
            Object.keys(event).forEach((key) => {
                const obj = {};
                if (event[key] !== '') {
                    obj[key] = event[key];
                    filterArray.push(obj);
                }
            });

            if (filterArray.length < 1) {
                return data.events.getAllItems({})
                    .then((events) => {
                        return res.render('events/browse-events',
                            { events: events });
                    });
            }

            return data.events.getAllItems({ $or: filterArray })
                .then((events) => {
                    return res.render('events/browse-events',
                        { events: events });
                });
        },
        getCreateEventPage(req, res) {
            if (res.locals.user) {
                return res.render('events/create-event');
            }

            return res.redirect('/');
        },
        createEvent(req, res) {
            const event = req.body;
            event.author = res.locals.user.username;

            return data.events.collection
                .findOne(
                { 'eventName': event.eventName, 'author': event.author },
                (error, existingEvent) => {
                    if (existingEvent) {
                        req.flash('error',
                            `Event with this name and ... already exists!`);

                        return res.redirect('/create-event');
                    }

                    return data.events
                        .add(event)
                        .then((_) => {
                            data.users.edit(
                                { username: event.author },
                                { $addToSet: { createdEvents: event } },
                                {
                                    upsert: false,
                                    multi: false,
                                });

                            return res.redirect('/profile');
                        })
                        .catch((err) => {
                            req.flash('error', err);
                            return res.redirect('/create-event');
                        });
                });
        },
        joinEvent(req, res) {
            const eventName = req.body.eventName;
            const userToJoin = res.locals.user.username;

            return data.events
                .getOne({ eventName: eventName })
                .then((event) => {
                    return data.users.getOne({
                        $and: [
                            { username: userToJoin },
                            {
                                joinedEvents:
                                { $elemMatch: { eventName: eventName } },
                            },
                        ],
                    })
                        .then((user) => {
                            if (user) {
                                // I dont know why this is not working.
                                req.flash('error',
                                    'You are already joined in this event!');
                            }

                            return data.users.edit(
                                { username: userToJoin },
                                { $addToSet: { joinedEvents: event } },
                                {
                                    upsert: false,
                                    multi: false,
                                });
                        });
                });
        },
        leaveEvent(req, res) {
            const eventName = req.body.eventName;
            const username = res.locals.user.username;

            return data.users.edit(
                { username: username },
                {
                    $pull: { joinedEvents: { eventName: eventName } },
                });
        },
    };
};

module.exports = eventsController;
