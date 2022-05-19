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

  

  // TODO: Detect if are 4 players

  socket.game = id;

  let game = games[id];

  game.players[socket.id] = { cards: [] };

  await socket.leave('global');
  await socket.join(`game-${id}`);

  socket.emit('game:rooms:join:success', game.name);

  let players = [];

  Object.keys(game.players).forEach(player => {
    let name = io.sockets.sockets.get(player).name;
    players.push(name);
  });

  setTimeout(() => {
    io.to(`game-${id}`).emit('game:room:player-join', players);
  }, 1000);
};
