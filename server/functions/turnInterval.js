// Types
import { Server } from 'socket.io';

// Functions
import nextTurn from './nextTurn.js';

/**
 * @param {Server} io
 * @param {object} game
 */
export default (io, game) => {
  console.log('30 seconds passed!');
  nextTurn(io, game);
};
