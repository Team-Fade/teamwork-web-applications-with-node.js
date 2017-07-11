const UsersData = require('./users.data');
const EventsData = require('./events.data');

const init = (db) => {
    return Promise.resolve({
        users: new UsersData(db),
        events: new EventsData(db),
    });
};

module.exports = {
    init,
};
