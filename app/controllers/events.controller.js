const eventsController = (data) => {
    return {
        getBrowseEventsPage(req, res) {
            data.events.getAllItems({}, {})
                .then((events) => {
                    return res.render('events/browse-events',
                        { events: events });
                });
        },
        getCreateEventPage(req, res) {
            // Only logged user can create event
            if (res.locals.user) {
                return res.render('events/create-event');
            }

            return res.redirect('/');
        },
        createEvent(req, res) {
            const event = req.body;
            event.author = res.locals.user.username;

            // Check if event doesnt exists in db
            data.events.collection
                .findOne(
                { 'eventName': event.eventName, 'author': event.author },
                (error, existingEvent) => {
                    if (existingEvent) {
                        req.flash('error',
                            `Event with this name and ... already exists!`);

                        return res.redirect('/create-event');
                    }

                    // Add event in events collection
                    return data.events.add(event)
                        .then((_) => {
                            // Add event in user createdEvents
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
    };
};

module.exports = eventsController;
