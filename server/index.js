import express from 'express';
import http from 'http';
import lodash from 'lodash';
import { Server } from 'socket.io';

const app = express();
const server = http.Server(app);
const io = new Server(server, { cors: { origin: '*' }});

import 'dotenv/config';

const debug = false;

// Sockets
import socketDisconnect from './sockets/disconnect.js';
import socketChatMessage from './sockets/chat/message.js';
import socketGameLogin from './sockets/game/login.js';

var cards = [
  [1,"espadas"],[1,"copas"],[1,"oros"],[1,"bastos"],
  [2,"espadas"],[2,"copas"],[2,"oros"],[2,"bastos"],
  [3,"espadas"],[3,"copas"],[3,"oros"],[3,"bastos"],
  [4,"espadas"],[4,"copas"],[4,"oros"],[4,"bastos"],
  [5,"espadas"],[5,"copas"],[5,"oros"],[5,"bastos"],
  [6,"espadas"],[6,"copas"],[6,"oros"],[6,"bastos"],
  [7,"espadas"],[7,"copas"],[7,"oros"],[7,"bastos"],
  [8,"espadas"],[8,"copas"],[8,"oros"],[8,"bastos"],
  [9,"espadas"],[9,"copas"],[9,"oros"],[9,"bastos"],
  [10,"espadas"],[10,"copas"],[10,"oros"],[10,"bastos"],
  [11,"espadas"],[11,"copas"],[11,"oros"],[11,"bastos"],
  [12,"espadas"],[12,"copas"],[12,"oros"],[12,"bastos"],
],

shuffled_array = lodash.shuffle(cards);

// Printing the output
// console.log(shuffled_array);

let game = {
  /*Id of player currently playing*/
  turn: 1,
  /*Object of the 12 positions actual state*/
  table: {
    'oros': {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
      10: false,
      11: false,
      12: false,
    },
    'espadas': {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
      10: false,
      11: false,
      12: false,
    },
    'copas': {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
      10: false,
      11: false,
      12: false,
    },
    'bastos': {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
      10: false,
      11: false,
      12: false,
    },
  },
  /*Array of the players currently connected in the game*/
  players: [
    {
      /*Id to identify the player*/
      id: 1,
      /*Name of the player logged*/
      name: 'demo',
      /*Array of the cards of the player*/
      cards: [
        {
          /*To identify the card we gonna use the id for security concerns*/
          id: 0,
          /*Number of the card*/
          number: 3,
          /*Type of card*/
          type: 'espadas'
        },
        { number: 3, type: 'copas' },
        { number: 4, type: 'oro' },
      ]
    }
  ]
}
// console.log(game);

app.get('/', (request, response) => {
  response.send('Hello World!');
});

io.on('connection', (socket) => {
  console.log(`[ws] ${socket.id} connected`);

  socket.on('game:login', (name) => socketGameLogin(socket, debug, name));
  socket.on('chat:message', (message) => socketChatMessage(socket, debug, message));
  socket.on('disconnect', () => socketDisconnect(socket, debug));
});

server.listen(process.env.PORT, () => {
  console.log(`listening on *:${process.env.PORT}`);
});
