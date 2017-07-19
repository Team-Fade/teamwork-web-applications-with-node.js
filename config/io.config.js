/* globals io */

const ioConfig = function(io) {
    // io.on('connection', (function(socket) {
    //     console.log('a user connected');

    //     socket.on('disconnect', function() {
    //         console.log('user disconnected');
    //     });

    //     socket.on('chat message', function(msg) {
    //         console.log('message: ' + msg);
    //     });

    //     socket.on('chat message', function(msg) {
    //         io.emit('chat message', msg);
    //     });
    // }));

    let numUsers = 0;

    io.on('connection', function(socket) {
        let addedUser = false;

        socket.on('add user', function(username) {
            if (addedUser) {
                return;
            }

            socket.username = username;
            ++numUsers;
            addedUser = true;
            socket.emit('login', {
                numUsers: numUsers,
            });

            socket.broadcast.emit('user joined', {
                username: socket.username,
                numUsers: numUsers,
            });
        });

        socket.on('disconnect', function() {
            if (addedUser) {
                --numUsers;

                socket.broadcast.emit('user left', {
                    username: socket.username,
                    numUsers: numUsers,
                });
            }
        });

        socket.on('new message', function(data) {
            socket.broadcast.emit('new message', {
                username: socket.username,
                message: data,
            });
        });

        socket.on('typing', function() {
            socket.broadcast.emit('typing', {
                username: socket.username,
            });
        });


        socket.on('stop typing', function() {
            socket.broadcast.emit('stop typing', {
                username: socket.username,
            });
        });
    });
};


module.exports = ioConfig;
