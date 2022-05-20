// Packages
import lodash from 'lodash';

// Types
import { Server, Socket } from 'socket.io';

// Functions
import turnInterval from '../../../functions/turnInterval.js';

/**
 * @param {Server} io
 * @param {Socket} socket
 * @param {boolean} debug
 * @param {object} games
 */
export default (io, socket, debug, games) => {
  if (debug) console.log('[debug] [on] [game:rooms:start-game] ()');

  let game = games[socket.data.game];
  let playersKeys = Object.keys(game.players);
  let gameOwner = playersKeys[0];

  if (gameOwner !== socket.id) {
    console.log('Error #2');
    return;
  }

  if (playersKeys.length < 2 || playersKeys.length > 4) {
    console.log('Error #3');
    return;
  }

  game.status = 'playing';
  io.to('searching').emit('game:rooms:deleted', game.id);

  let chunks = game.cards.length / playersKeys.length;

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

    let playerId = playersKeys[index]
    let player = game.players[playerId];

    player.cards = playerCards;

    for (let card of player.cards) {
      if (card === '5-o') {
        game.turn = index;
        break;
      }
    }
   /**
    * TODO: Send an array of all the players with the game
    * let contraryPlayers = [];
    for(let key in playersKeys){
        contraryPlayers[playersKeys] = io.sockets.sockets.get(playersKeys[key]).data.name;
    }
    console.log(contraryPlayers);
    **/
    io.to(playerId).emit('game:rooms:get-cards', player.cards,contraryPlayers);
  };

  let playerId = playersKeys[game.turn];
  let playerName = io.sockets.sockets.get(playerId).data.name;

  io.to(`game-${game.id}`).emit('game:rooms:turn', playerName);

  game.interval = setInterval(() => turnInterval(io, game), 30_000);
};
