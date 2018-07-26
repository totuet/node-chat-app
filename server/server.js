const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));



io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New User Joined the chat app.',
        createdAt: new Date().getTime()
    })


    socket.on('createMessage', (msg) => {
        console.log(msg);
        socket.broadcast.emit('newMessage', msg);
    });




    socket.on('disconnect', (socket) => {
        console.log("user disconnected");
    });
});

server.listen(port, () => console.log(`Server is listening on port ${port}.`))
