const shortHash = require("short-hash");

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const port = 6600;

let rooms = [];

const getUsersInRoom = (roomHash) => {

    /*
    ;
    return ;*/
};

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('newUser', user => {
        socket.user = user;
    });

    socket.on('join_room', data => {
        const existedRoom = rooms.find(room => room.hash === data.room.hash);
        if (existedRoom) {
            if (socket.user) {
                socket.user = {...socket.user, rooms: [...socket.user.rooms, existedRoom]};
            } else {
                socket.user = {name: data.user.name, rooms: [existedRoom]};
            }

            socket.join(data.room.hash);
            socket.broadcast.to(data.room.hash).emit('user_join_room', {
                user: {
                    name: socket.user.name
                },
                room: {
                    hash: data.room.hash,
                },
            });
        }
    });

    socket.on('create_room', data => {
        const hash = shortHash((Math.random() * 100000).toString());
        const name = getColorName();

        socket.join(hash);

        rooms = [...rooms, {hash: hash, name: name}];
        if (socket.user) {
            socket.user = {...socket.user, rooms: [...socket.user.rooms, {hash: hash, name: name}]};
        } else {
            socket.user = {name: data.user.name, rooms: [{hash: hash, name: name}]};
        }

        console.log('socket rooms', socket.user);
        socket.emit('room', {name, hash})
    });

    socket.on('get_users_in_room', data => {
        emitUsersOnline(data.id);
    });


    socket.on('get_room', (hash) => {
        const room = rooms.find(r => r.hash === hash);
        socket.emit('room', room)
    });


    socket.on('leave_room', (hash) => {
        socket.leave(hash);
        emitUsersOnline(hash);
    });

    socket.on('send_message', ({message, roomId}) => {
        socket.broadcast.to(roomId).emit('message', {author: socket.user.name, text: message, date: Date.now(), roomId});
    });


    socket.on('disconnect', () => {
        console.log('disconnected');
        if(socket.user){
            socket.user.rooms.map(r => {
                emitUsersOnline(r.hash);
            })
        }
    });

});


http.listen(port, function () {
    console.log(`listening on *:${port}`);
});

function emitUsersOnline(roomHash) {
    if (io.nsps["/"].adapter.rooms[roomHash]) {
        const clients = io.nsps["/"].adapter.rooms[roomHash].sockets;
        const socketsId = (typeof clients !== 'undefined') ? Object.keys(clients) : [];
        const sockets = socketsId.map(s => io.sockets.connected[s]);
        const users = sockets.map(s => s.user);

        io.to(roomHash).emit('users_in_room', {users, hash: roomHash});
    }
}

function getColorName() {
    const colors = [
        'gray', 'silver', 'black', 'red', 'maroon', 'yellow',
        'olive', 'lime', 'green', 'aqua', 'teal', 'blue',
        'navy', 'fuchsia', 'purple', 'orange'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}
