const BaseData = require('./base/base.data');
const Event = require('../models/event.model');

class EventsData extends BaseData {
    constructor(db) {
        super(db, Event);
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
