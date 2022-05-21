// Types
import { Server, Socket } from 'socket.io';

// Functions
import canMoveCard from './canMoveCard.js';
import timerInterval from './timerInterval.js';
import turnInterval from './turnInterval.js';

/**
 * @param {Server} io
 * @param {Socket} socket
 * @param {boolean} debug
 * @param {object} games
 */
export default (io, game) => {
  let playersIds = Object.keys(game.players);

  // TODO: Detect if player can move card and move automatically

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

  clearInterval(game.timer);
  clearInterval(game.interval);
  console.log('clearInterval');

  io.to(`game-${game.id}`).emit('game:rooms:turn', nextPlayerName);

  game.clock = 30;
  game.timer = setInterval(() => timerInterval(io, game), 1_000);
  game.interval = setInterval(() => turnInterval(io, game), 30_000);
  console.log('setInterval');
};
