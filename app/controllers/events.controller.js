const eventsController = (data) => {
    return {
        getBrowseEventsPage(req, res) {
            return res.render('events/browse-events');
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
                (_, existingEvent) => {
                    if (existingEvent) {
                        req.flash('error',
                            `Event with this name and ... already exists!`);

                        return res.redirect('/create-event');
                    }

                    // TODO: I ll finish this later :)

                    // Add event in events collection
                    data.events.add(event);

                    // Add event in user createdEvents
                    data.users.findUserByUsername(event.author)
                        .then((dbUser) => {
                            console.log(dbUser);
                        });
                });
        },
    };
};

module.exports = eventsController;
