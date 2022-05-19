// Types
import { Server, Socket } from 'socket.io';
import lodash from 'lodash';

/**
 * @param {Server} io
 * @param {Socket} socket
 * @param {boolean} debug
 * @param {object} games
 */
export default (io, socket, debug, games) => {
  console.log('[debug] [on] [game:rooms:start-game] ()');

  let rooms = Array.from(socket.rooms.values());
  let joinedGames = rooms.filter(r => r.startsWith('game-'));

  if (joinedGames.length != 1) {
    console.log('Error #1');
    return;
  }

  let id = joinedGames[0].replace('game-', '');
  let game = games[id];
  let gameOwner = Object.keys(game.players)[0];
  let playersLength = Object.keys(game.players).length;

  if (gameOwner !== socket.id) {
    console.log('Error #2');
    return;
  }

  if (playersLength < 2 || playersLength > 4) {
    console.log('Error #3');
    return;
  }

  let chunks = game.cards.length / playersLength;

  let cards = game.cards.reduce((previous, current, index) => {
    let chunkIndex = Math.floor(index / chunks);

    if (!previous[chunkIndex]) {
      previous[chunkIndex] = [];
    }

    previous[chunkIndex].push(current);

    return previous;
  }, []);

  for (let [index, value] of cards.entries()) {
    let playerCards = lodash.cloneDeep(value);
    let playerId = Object.keys(game.players)[index]
    let player = game.players[playerId];

    player.cards = playerCards;

    for (let card of player.cards) {
      if (card === '5-o') {
        game.turn = index;
        break;
      }
    }

    io.to(playerId).emit('game:rooms:get-cards', player.cards);
  };

  let playerId = Object.keys(game.players)[game.turn];
  let playerName = io.sockets.sockets.get(playerId).name;

  io.to(`game-${game.id}`).emit('game:rooms:turn', playerName);
};
