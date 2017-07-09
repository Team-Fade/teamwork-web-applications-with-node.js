const BaseData = require('./base/base.data');
const EventModel = require('../models/event.model');

class EventsData extends BaseData {
    constructor(db) {
        super(db, EventModel);
    }
}

module.exports = EventsData;
