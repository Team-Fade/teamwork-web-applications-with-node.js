const { serverConfig } = require('./config');
const { dbConfig } = require('./config');

const successMessage = `Server is running on localhost//:${serverConfig.port}`;

const start = (function() {
    return Promise.resolve()
        .then(() => require('./db').init(dbConfig.connectionString))
        .then((db) => require('./data').init(db))
        .then((data) => require('./app').init(data))
        .then((app) => {
            app.listen(serverConfig.port,
                () =>
                    console.log(successMessage));
        });
}());

module.exports = {
    start,
};
