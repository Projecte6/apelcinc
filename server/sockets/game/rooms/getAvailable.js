// Types
import { Socket } from 'socket.io';

/**
 * @param {Socket} socket
 * @param {boolean} debug
 * @param {object} games
 */
export default (socket, debug, games) => {
  if (debug) console.log('[debug] [on] [game:rooms:get-available] ()');

  let waitingGames = [];

  Object.keys(games).forEach(id => {
    let game = games[id];

    if (game.status !== 'waiting' && game.type !== 'public') {
      return;
    }

    waitingGames.push({
      id: game.id,
      name: game.name,
      players: Object.keys(game.players).length,
      type: game.type,
    });
  });

  socket.emit('game:rooms:get-available', waitingGames);
};
