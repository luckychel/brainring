const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

let allClients = [];
io.on('connection', (socket) => {
    allClients.push(socket);

    io.emit('chat message', 'user connected ' + socket.id);
    //socket.broadcast.emit('hi');
    socket.on('chat message', (msg) => {
        io.emit('chat message', socket.id + ": " + msg);
    });
    socket.on('disconnect', () => {
        //console.log(socket);
        //var i = allCliensts.indexOf(socket);
        //allClients.splice(i, 1);
        io.emit('user disconnected', socket.id);
    });
});

http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});

