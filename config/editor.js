
module.exports.editorSockets = function (socketServer) {
    let io = require('socket.io')(socketServer);
    io.sockets.on('connection', function (socket) {
        socket.on('disconnect', function () {
            console.log('editor socket disconnected!');
        });
        socket.on('join-room', (roomId, userId) => {
            socket.join(roomId);
            socket.to(roomId).broadcast.emit('user-connected', userId)

            socket.on('disconnect', () => {
                socket.to(roomId).broadcast.emit('user-disconnected', userId);
            })
            socket.on('message', (evt) => {
                socket.to(roomId).broadcast.emit('message', evt);
            })
        })


    });

}

