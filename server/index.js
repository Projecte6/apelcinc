const express = require('express');

const http = require('http');
const { Server } = require('socket.io');

require('dotenv').config();

const app = express();
const server = http.createServer(app)
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(process.env.PORT, () => {
  console.log(`listening on *:${process.env.PORT}`);
});
