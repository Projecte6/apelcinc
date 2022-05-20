// Types
import { Socket } from 'socket.io';

/**
 * @param {Socket} socket
 * @param {boolean} debug
 * @param {object} games
 * @param {string} id
 */
export default async (io, socket, debug, games, id) => {
  if (debug) console.log(`[debug] [on] [game:rooms:join] (${id})`);

  let game = games[id];

  if (Object.keys(game.players) >= 4) {
    console.log(`[join.js:16] Error can't join game ${game.id} because is full`);
    return;
  }

  socket.data.game = id;
  game.players[socket.id] = { name: socket.name, cards: [] };

  await socket.leave('global');
  await socket.join(`game-${id}`);

  socket.emit('game:rooms:join:success', { id: game.id, name: game.name });

  let players = [];

  Object.keys(game.players).forEach(async id => {
    let name = io.sockets.sockets.get(id).data.name;
    players.push(name);
  });

  setTimeout(() => io.to(`game-${id}`).emit('game:room:player-join', players), 1000);
};
