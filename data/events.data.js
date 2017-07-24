const BaseData = require('./base/base.data');
const Event = require('../models/event.model');

class EventsData extends BaseData {
    constructor(db) {
        super(db, Event);
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
