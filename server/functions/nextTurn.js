// Types
import { Server, Socket } from 'socket.io';

/**
 * @param {Server} io
 * @param {Socket} socket
 * @param {boolean} debug
 * @param {object} games
 */
export default (io, game) => {
  let playersIds = Object.keys(game.players);

  game.turn = (game.turn + 1 === playersIds)
    ? 0
    : game.turn + 1;

  let nextPlayerId = playersIds[game.turn];
  let nextPlayer = io.sockets.sockets.get(nextPlayerId);
  let nextPlayerName = nextPlayer.name;

  console.log(`nextPlayerId: ${nextPlayerId}`);
  console.log(`nextPlayerName: ${nextPlayerName}`);

  if (!nextPlayerName) {
    console.log('[nextTurn.js:21] Error getting next player name');
    return;
  }

  io.to(`game-${game.id}`).emit('game:rooms:turn', nextPlayerName);
};
