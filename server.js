const { serverConfig } = require('./config');
const { dbConfig } = require('./config');
const { ioConfig } = require('./config');


const successMessage = `Server is running on localhost//:${serverConfig.port}`;

const start = (function() {
    return Promise.resolve()
        .then(() => require('./db').init(dbConfig.connectionString))
        .then((db) => require('./data').init(db))
        .then((data) => require('./app').init(data))
        .then((app) => {
            // eslint-disable-next-line
            const server = require('http').Server(app);
            const io = require('socket.io')(server);

            server.listen(serverConfig.port, () => console.log(successMessage));
            ioConfig(io);
        });
}());


module.exports = {
    start,
};
