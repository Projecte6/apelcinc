// Types
import { Server, Socket } from 'socket.io';

// Functions
import nextTurn from '../../../functions/nextTurn.js';

/**
 * @param {Server} io
 * @param {Socket} socket
 * @param {boolean} debug
 * @param {object} games
 */
export default (io, socket, debug, games) => {
  if (debug) console.log('[game:rooms:skip-turn]');

  if (!socket.data.game) {
    console.log('Error #1');
    return;
  }

  let game = games[socket.data.game];

  if (Object.keys(game.players)[game.turn] !== socket.id) {
    socket.emit('game:rooms:error', 'No es el teu torn');
    return;
  }

  console.log(`socket.game: ${socket.data.game}`);

  nextTurn(io, game);
};
