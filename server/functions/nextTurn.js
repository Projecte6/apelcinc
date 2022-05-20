// Types
import { Server, Socket } from 'socket.io';

// Functions
import turnInterval from './turnInterval.js';

/**
 * @param {Server} io
 * @param {Socket} socket
 * @param {boolean} debug
 * @param {object} games
 */
export default (io, game) => {
  let playersIds = Object.keys(game.players);

  game.turn = (game.turn + 1 === playersIds.length)
    ? 0
    : game.turn + 1;

  console.log(`game.turn ${game.turn}`);
  console.log(`nextPlayerId ${playersIds[game.turn]}`);
  console.log(`player.name ${io.sockets.sockets.get(playersIds[game.turn]).data.name}`);

  let nextPlayerId = playersIds[game.turn];
  let nextPlayerName = io.sockets.sockets.get(nextPlayerId).data.name;

  console.log(`nextPlayerId: ${nextPlayerId}`);
  console.log(`nextPlayerName: ${nextPlayerName}`);

  if (!nextPlayerName) {
    console.log('[nextTurn.js:21] Error getting next player name');
    return;
  }

  clearInterval(game.interval);
  console.log('clearInterval');

  io.to(`game-${game.id}`).emit('game:rooms:turn', nextPlayerName);

  game.interval = setInterval(() => turnInterval(io, game), 30_000);
  console.log('setInterval');
};
