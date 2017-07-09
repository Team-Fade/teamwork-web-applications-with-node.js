const UsersData = require('./users.data');
const EventsData = require('./events.data');

// const init = (db) => {
//     return Promise.all([
//         Promise.resolve({ users: new UsersData(db) }),
//         Promise.resolve({ events: new EventsData(db) }),
//     ]);
// };

const init = (db) => {
    return Promise.resolve({
        users: new UsersData(db),
        events: new EventsData(db),
    });
};

module.exports = {
    init,
};
