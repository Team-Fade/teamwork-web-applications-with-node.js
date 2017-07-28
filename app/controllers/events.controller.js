const fs = require('fs');
const ObjectId = require('mongodb').ObjectId;
const { imageHelper } = require('../../utils');
const VALIDATOR = require('../../utils/validator/validator.new');

const init = (data) => {
    const eventsController = {
        getBrowseEventsPage(req, res) {
            const event = req.query;
            let user = null;

            if (req.session.passport) {
                user = req.session.passport.user;
            }

            const filterArray = [];
            Object.keys(event).forEach((key) => {
                const obj = {};
                if (event[key] !== '') {
                    obj[key] = event[key];
                    filterArray.push(obj);
                }
            });

            if (filterArray.length < 1) {
                return data.events.getAllItems()
                    .then((eventsData) => {
                        return res.render('events/browse-events',
                            {
                                context: eventsData,
                                user: user,
                            });
                    });
            }

            return data.events
                .getAllItems({ $or: filterArray })
                .then((eventsData) => {
                    return res.render('events/browse-events',
                        {
                            context: eventsData,
                            user: user,
                        });
                });
        },
        getCreateEventPage(req, res) {
            return res.render('events/create-event');
        },
        createEvent(req, res) {
            const event = req.body;
            event.author = res.locals.user.username;

            const validatorError = VALIDATOR.validateEvent(event);

            if (validatorError.message) {
                req.flash('createEvent', validatorError.message);
                return res.redirect('/events/create');
            }

            return data.events
                .getOne(
                {
                    $and: [
                        { eventName: event.eventName },
                        { author: event.author },
                    ],
                })
                .then((existingEvent) => {
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
                        .then(res.redirect('/profile'));
                });
        },
        joinEvent(req, res) {
            const eventId = req.params.id;
            if (req.params.action === 'join') {
                return data.events
                    .getOne({ _id: new ObjectId(eventId) })
                    .then((event) => {
                        if (event.author === res.locals.user.username) {
                            req.flash('error',
                                'You are author of this event!');

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
                    if (event) {
                        return res.render('events/manage-event',
                            { context: event });
                    }

                    req.flash('error', 'You dont have any created events!');
                    return res.redirect('/events/create');
                });
        },
        editEvent(req, res) {
            const eventId = req.headers.referer.split('/').pop();

            let newEventName = req.body.eventName;
            let newEventLocation = req.body.eventLocation;
            let newEventType = req.body.eventType;
            let newEventDescription = req.body.eventDescription;
            let image;

            return data.events.getOne({ _id: new ObjectId(eventId) })
                .then((event) => {
                    if (!event) {
                        req.flash('error',
                            'Event that you want to edit dont exists!');
                        return res.redirect('/user/profile/my-events');
                    }

                    if (typeof newEventName === 'undefined') {
                        newEventName = event.eventName;
                    }

                    if (typeof newEventLocation === 'undefined') {
                        newEventLocation = event.eventLocation;
                    }

                    if (typeof newEventType === 'undefined') {
                        newEventType = event.eventType;
                    }

                    if (typeof newEventDescription === 'undefined') {
                        newEventDescription = event.eventDescription;
                    }

                    if (req.file) {
                        image = imageHelper.setNewPicture(req);
                        fs.unlink(req.file.path, (err) => {
                            if (err) {
                                req.flash('error', err);
                            }
                        });
                    } else {
                        image = event.eventImage;
                    }

                    return data.events.edit(
                        { _id: new ObjectId(eventId) },
                        {
                            $set: {
                                eventName: newEventName,
                                eventLocation: newEventLocation,
                                eventType: newEventType,
                                eventDescription: newEventDescription,
                                eventImage: image,
                            },
                        });
                })
                .then(() => res.redirect('/user/profile/my-events'));
        },
    };

    return eventsController;
};

module.exports = { init };
