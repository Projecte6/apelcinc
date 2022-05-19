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

  if (!socket.game) {
    console.log('Error #1');
    return;
  }

  console.log(`socket.game: ${socket.game}`);

  let game = games[socket.game];

  nextTurn(io, game);
};
