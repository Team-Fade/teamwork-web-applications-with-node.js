const BaseData = require('./base/base.data');
const Event = require('../models/event.model');

class EventsData extends BaseData {
    constructor(db) {
        super(db, Event);
    }
}

module.exports = EventsData;
