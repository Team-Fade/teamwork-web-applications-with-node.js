const BaseData = require('./base/base.data');
const Event = require('../models/event.model');
const VALIDATOR = require('../utils/validator/validator.new');

class EventsData extends BaseData {
    constructor(db) {
        super(db, Event);
    }

    add(event) {
        if (VALIDATOR.validateEvent(event).isValid) {
            if (Event.isValid(event)) {
                return super.add(event);
            }
        }

        return super.add(null);
    }

    getUserJoinedEvents(username) {
        return this.collection.find(
            { participants: { $elemMatch: { $eq: username } } })
            .toArray();
    }

    getUserCreatedEvents(username) {
        return this.collection
            .find({ author: username })
            .toArray();
    }

    sortEventsByParticipants() {
        return this.collection
            .find()
            .sort({ participantsCount: -1 })
            .limit(5)
            .toArray();
    }

    groupEvents() {
        return this.collection.aggregate(
            [
                {
                    $group:
                    {
                        _id: null,
                        eventNames: { $push: '$eventName' },
                        eventLocations: { $push: '$eventLocation' },
                        eventTypes: { $push: '$eventType' },
                    },
                },
            ])
            .toArray();
    }
}

module.exports = EventsData;
