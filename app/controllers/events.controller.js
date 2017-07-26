const fs = require('fs');
const ObjectId = require('mongodb').ObjectId;
const { imageHelper } = require('../../utils');

const eventsController = (data) => {
    return {
        getBrowseEventsPage(req, res) {
            return data.events
                .getAllItems()
                .then((events) => {
                    if (events) {
                        return res.render('events/browse-events',
                            {
                                context: events,
                                user: res.locals.user,
                            });
                    }

                    return res.send({ errorMessage: 'No events avaible' });
                });
        },
        getFilteredEvents(req, res) {
            const event = req.body;

            console.log(event);

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
                    .then((eventsData) => {
                        return res.render('events/browse-events',
                            { context: eventsData });
                    });
            }

            return data.events.getAllItems({ $or: filterArray })
                .then((eventsData) => {
                    return res.render('events/browse-events',
                        { context: eventsData });
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
                { eventName: event.eventName, author: event.author },
                (error, existingEvent) => {
                    if (existingEvent) {
                        req.flash('error',
                            `Event with this name and ... already exists!`);

                        return res.redirect('/create');
                    }

                    if (req.file) {
                        event.eventImage =
                            imageHelper.setNewPicture(req);
                    } else {
                        event.eventImage =
                            imageHelper.getDefaultEventPricture();
                    }

                    return data.events
                        .add(event)
                        .then(res.redirect('/profile'))
                        .catch((err) => {
                            req.flash('error', err);
                            return res.redirect('/create');
                        });
                });
        },
        joinEvent(req, res) {
            const eventId = req.params.id;
            if (req.params.action === 'join') {
                return data.events
                    .getOne({ _id: new ObjectId(eventId) })
                    .then((event) => {
                        if (event.author === res.locals.user.username) {
                            req.flash('error', 'You are author of this event!');

                            return res.redirect('/browse');
                        }

                        return data.events.edit(
                            { _id: new ObjectId(eventId) },
                            {
                                $addToSet:
                                { participants: res.locals.user.username },
                            },
                            {
                                upsert: false,
                                multi: false,
                            });
                    });
            }

            return this.leaveEvent(req, res);
        },
        leaveEvent(req, res) {
            const eventId = req.params.id;
            if (req.params.action === 'leave') {
                return data.events.edit(
                    { _id: new ObjectId(eventId) },
                    {
                        $pull: { participants: res.locals.user.username },
                    });
            }

            return this.joinEvent(req, res);
        },
        getManageEventPage(req, res) {
            const eventId = req.params.id;
            return data.events.getOne({ _id: new ObjectId(eventId) })
                .then((event) => {
                    return res.render('events/manage-event',
                        { context: event });
                });
        },
        editEvent(req, res) {
            const eventId = req.headers.referer.split('/').pop();
            const newEventName = req.body.eventName;

            const changeEventNamePromise =
                new Promise((resolve, reject) => {
                    if (typeof newEventName === 'undefined' ||
                        newEventName === null ||
                        newEventName === '') {
                        return;
                    }

                    data.events.edit(
                        { _id: new ObjectId(eventId) },
                        {
                            $set: {
                                eventName: newEventName,
                            },
                        });
                });

            const newEventLocation = req.body.eventLocation;

            const changeEventLocationPromise =
                new Promise((resolve, reject) => {
                    if (typeof newEventLocation === 'undefined' ||
                        newEventLocation === null ||
                        newEventLocation === '') {
                        return;
                    }

                    data.events.edit(
                        { _id: new ObjectId(eventId) },
                        {
                            $set: {
                                eventLocation: newEventLocation,
                            },
                        });
                });

            const newEventType = req.body.eventType;

            const changeEventTypePromise =
                new Promise((resolve, reject) => {
                    if (typeof newEventType === 'undefined' ||
                        newEventType === null ||
                        newEventType === '') {
                        return;
                    }

                    data.events.edit(
                        { _id: new ObjectId(eventId) },
                        {
                            $set: {
                                eventType: newEventType,
                            },
                        });
                });

            const newEventDescription = req.body.eventDescription;

            const changeEventDescriptionPromise =
                new Promise((resolve, reject) => {
                    if (typeof newEventDescription === 'undefined' ||
                        newEventDescription === null ||
                        newEventDescription === '') {
                        return;
                    }

                    data.events.edit(
                        { _id: new ObjectId(eventId) },
                        {
                            $set: {
                                eventDescription: newEventDescription,
                            },
                        });
                });

            const changeEventPicturePromise =
                new Promise((resolve, reject) => {
                    if (req.file) {
                        const image = imageHelper.setNewPicture(req);
                        data.events.edit(
                            { _id: new ObjectId(eventId) },
                            { $set: { eventImage: image } })
                            .then(() => {
                                fs.unlink(req.file.path, (err) => {
                                    if (err) {
                                        req.flash('error', err);
                                    }
                                });
                            });
                    }
                });

            Promise.all([
                changeEventNamePromise,
                changeEventLocationPromise,
                changeEventTypePromise,
                changeEventDescriptionPromise,
                changeEventPicturePromise,
            ])
                .then(res.redirect('/user/profile/my-events'));
        },
    };
};

module.exports = eventsController;
