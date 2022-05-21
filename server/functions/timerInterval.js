// Types
import { Server } from 'socket.io';

/**
 * @param {Server} io
 * @param {object} game
 */
export default (io, game) => {
  game.clock = game.clock - 1;
  console.log(`clock ${game.clock}`);
  io.to(`game-${game.id}`).emit('game:rooms:clock', game.clock);
};
