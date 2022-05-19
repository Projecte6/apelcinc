import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.Server(app);
const io = new Server(server, { cors: { origin: '*' }});

import 'dotenv/config';

const debug = false;

// Sockets
import socketGameLogin from './sockets/game/login.js';
import socketWebPageJoin from './sockets/web/page/join.js';
import socketGameRoomsCreate from './sockets/game/rooms/create.js';
import socketGameRoomsGetAvailable from './sockets/game/rooms/getAvailable.js';
import socketGameRoomsJoin from './sockets/game/rooms/join.js';
import socketGameRoomsStartGame from './sockets/game/rooms/startGame.js'
import socketGameRoomsMoveCard from './sockets/game/rooms/moveCard.js';
import socketDisconnect from './sockets/disconnect.js';
import socketChatMessage from './sockets/chat/message.js';

// Events
import eventRoomCreate from './events/room/create.js';
import eventRoomDelete from './events/room/delete.js';
import eventRoomJoin from './events/room/join.js';
import eventRoomLeave from './events/room/leave.js';

let rooms = [];
let usernames = [];

// let cards = [
//   { number: 1,  type: 'espadas' }, { number: 1,  type: 'copas' }, { number: 1,  type: 'oros' }, { number: 1,  type: 'bastos' },
//   { number: 2,  type: 'espadas' }, { number: 2,  type: 'copas' }, { number: 2,  type: 'oros' }, { number: 2,  type: 'bastos' },
//   { number: 3,  type: 'espadas' }, { number: 3,  type: 'copas' }, { number: 3,  type: 'oros' }, { number: 3,  type: 'bastos' },
//   { number: 4,  type: 'espadas' }, { number: 4,  type: 'copas' }, { number: 4,  type: 'oros' }, { number: 4,  type: 'bastos' },
//   { number: 5,  type: 'espadas' }, { number: 5,  type: 'copas' }, { number: 5,  type: 'oros' }, { number: 5,  type: 'bastos' },
//   { number: 6,  type: 'espadas' }, { number: 6,  type: 'copas' }, { number: 6,  type: 'oros' }, { number: 6,  type: 'bastos' },
//   { number: 7,  type: 'espadas' }, { number: 7,  type: 'copas' }, { number: 7,  type: 'oros' }, { number: 7,  type: 'bastos' },
//   { number: 8,  type: 'espadas' }, { number: 8,  type: 'copas' }, { number: 8,  type: 'oros' }, { number: 8,  type: 'bastos' },
//   { number: 9,  type: 'espadas' }, { number: 9,  type: 'copas' }, { number: 9,  type: 'oros' }, { number: 9,  type: 'bastos' },
//   { number: 10, type: 'espadas' }, { number: 10, type: 'copas' }, { number: 10, type: 'oros' }, { number: 10, type: 'bastos' },
//   { number: 11, type: 'espadas' }, { number: 11, type: 'copas' }, { number: 11, type: 'oros' }, { number: 11, type: 'bastos' },
//   { number: 12, type: 'espadas' }, { number: 12, type: 'copas' }, { number: 12, type: 'oros' }, { number: 12, type: 'bastos' },
// ];

let cards = [
  '1-e',  '1-c',  '1-o',  '1-b',
  '2-e',  '2-c',  '2-o',  '2-b',
  '3-e',  '3-c',  '3-o',  '3-b',
  '4-e',  '4-c',  '4-o',  '4-b',
  '5-e',  '5-c',  '5-o',  '5-b',
  '6-e',  '6-c',  '6-o',  '6-b',
  '7-e',  '7-c',  '7-o',  '7-b',
  '8-e',  '8-c',  '8-o',  '8-b',
  '9-e',  '9-c',  '9-o',  '9-b',
  '10-e', '10-c', '10-o', '10-b',
  '11-e', '11-c', '11-o', '11-b',
  '12-e', '12-c', '12-o', '12-b',
];

let games = {};

app.get('/', (request, response) => {
  response.send('Hello World!');
});

io.on('connection', (socket) => {
  console.log(`[ws] [connection] ${socket.id} connected`);

  ////
  // Sockets
  ////

  // Web
  socket.on('web:page:join', () => socketWebPageJoin(socket, debug));

  // Game
  socket.on('game:login', (name) => socketGameLogin(io, socket, debug, usernames, name));
  socket.on('game:rooms:create', (name) => socketGameRoomsCreate(socket, debug, cards, games, name));
  socket.on('game:rooms:get-available', () => socketGameRoomsGetAvailable(socket, debug, games));
  socket.on('game:rooms:join', (id) => socketGameRoomsJoin(io, socket, debug, games, id));
  socket.on('game:rooms:start-game', () => socketGameRoomsStartGame(io, socket, debug, games));
  socket.on('game:rooms:move-card', (card) => socketGameRoomsMoveCard(io, socket, debug, games, card));

  // Chat
  socket.on('chat:message', (message) => socketChatMessage(socket, debug, message));

  // Native
  socket.on('disconnect', () => socketDisconnect(socket, debug, usernames));
});

////
// Events
////

// Native
io.of('/').adapter.on('create-room', (room) => eventRoomCreate(debug, rooms, room));
io.of('/').adapter.on('delete-room', (room) => eventRoomDelete(io, debug, rooms, room));
io.of('/').adapter.on('join-room', (room, id) => eventRoomJoin(io, debug, games, room, id));
io.of('/').adapter.on('leave-room', (room, id) => eventRoomLeave(io, debug, games, room, id));

server.listen(process.env.PORT, () => {
  console.log(`listening on *:${process.env.PORT}`);
});
