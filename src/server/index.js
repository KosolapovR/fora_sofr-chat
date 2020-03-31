var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const port = 6600;

const getVisitors = () => {
    const clients = io.sockets.clients().connected;
    const sockets = Object.values(clients);
    return sockets.map(s => s.user);
};

const emitVisitors = () => {
    io.emit('visitors', getVisitors());
};

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('new_visitors', user => {
    console.log(user.name);
    socket.user = user;
    emitVisitors();
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function (socket) {
        console.log('disconnected');
        emitVisitors();
    });
});


http.listen(port, function () {
    console.log(`listening on *:${port}`);
});