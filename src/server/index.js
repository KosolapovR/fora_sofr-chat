const shortHash = require("short-hash");

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = 8080;

let rooms = [];

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

    socket.on('newUser', user => {
        socket.user = user;
    });

    socket.on('join_room', data => {
        const existedRoom = rooms.find(room => room.hash === data.room.hash);
        if (existedRoom) {
            if (socket.user) {
                socket.user = {...socket.user, rooms: [...socket.user.rooms, existedRoom]};
            } else {
                socket.user = {name: data.user.name, icon: data.user.icon, rooms: [existedRoom]};
            }

            socket.join(data.room.hash);
            socket.broadcast.to(data.room.hash).emit('user_join_room', {
                user: {
                    name: socket.user.name,
                    icon: socket.user.icon
                },
                room: {
                    hash: data.room.hash,
                },
            });
        }
    });

    socket.on('create_room', data => {

        //генерируем короткий хэш для комнаты
        const hash = shortHash((Math.random() * 100000).toString());
        const name = getRoomName();

        socket.join(hash);
        rooms = [...rooms, {hash: hash, name: name}];

        if (socket.user) {
            socket.user = {
                ...socket.user,
                rooms: [
                    ...socket.user.rooms,
                    {hash: hash, name: name}
                ]
            };
        } else {
            socket.user = {
                name: data.user.name,
                icon: data.user.icon,
                rooms: [
                    {hash: hash, name: name}
                ]
            };
        }

        socket.emit('room', {name, hash})
    });

    socket.on('get_users_in_room', data => {
        emitUsersOnline(data.id);
    });

    socket.on('get_room', (hash) => {

        //получаем комнату по хэшу
        const room = rooms.find(r => r.hash === hash);
        socket.emit('room', room)
    });

    socket.on('leave_room', (hash) => {
        socket.leave(hash);
        emitUsersOnline(hash);
    });

    socket.on('send_message', ({message, roomId}) => {
        socket.broadcast.to(roomId).emit('message', {
            author: socket.user.name,
            text: message,
            date: Date.now(),
            icon: socket.user.icon,
            roomId
        });
    });

    socket.on('start_typing', ({user, roomId}) => {
        socket.broadcast.to(roomId).emit('typing_on', {user: {name: user.name, id: socket.id}, hash: roomId});
    });

    socket.on('stop_typing', ({user, roomId}) => {
        socket.broadcast.to(roomId).emit('typing_off', {user: {name: user.name, id: socket.id}, hash: roomId});
    });

    socket.on('disconnect', () => {
        console.log('disconnected');
        if (socket.user) {
            socket.user.rooms.map(r => {
                emitUsersOnline(r.hash);
            })
        }
    });
});

http.listen(port, function () {
    console.log(`listening on *:${port}`);
});

//оповещает о пользователях онлайн в заданной комнате
function emitUsersOnline(roomHash) {
    if (io.nsps["/"].adapter.rooms[roomHash]) {
        const clients = io.nsps["/"].adapter.rooms[roomHash].sockets;
        const socketsId = (typeof clients !== 'undefined') ? Object.keys(clients) : [];
        const sockets = socketsId.map(s => io.sockets.connected[s]);
        const users = sockets.map(s => s.user);

        io.to(roomHash).emit('users_in_room', {users, hash: roomHash});
    }
}

//генерирует случайное название комнаты
function getRoomName() {
    const rooms = [
        'New-York', 'Moscow', 'London', 'Berlin', 'Rome', 'Tokyo',
        'Canberra', 'Ottawa', 'Prague', 'Tallinn', 'Helsinki', 'Oslo',
        'Athens', 'Dublin', 'Jakarta', 'Seoul', 'Riga', 'Nairobi',
        'Monaco', 'Amsterdam', 'Wellington', 'Lisbon', 'Warsaw', 'Dakar',
    ];
    return rooms[Math.floor(Math.random() * rooms.length)];
}
