// Types
import { Server, Socket } from 'socket.io';

// Functions
import canMoveCard from '../../../functions/canMoveCard.js';
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

  for (let card of game.players[socket.id].cards) {
    if (canMoveCard(game, card)) {
      socket.emit('game:rooms:error', 'No pots passar perquè tens una carta vàlida');
      return;
    }
  }

  nextTurn(io, game);
};
