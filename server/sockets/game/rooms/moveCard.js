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
export default (io, socket, debug, games, card) => {
  if (debug) console.log(`[game:rooms:move-card] ${card}`);

  if (!card) {
    console.log('[moveCard.js:17] Error player not sended any card');
    socket.emit('game:rooms:error', 'No hem rebut cap carta');
    return;
  }

  if (!socket.game) {
    console.log('[moveCard.js:23] Error player is not in any game');
    socket.emit('game:rooms:error', 'No estàs en cap partida');
    return;
  }

  let gameId = socket.game;
  let game = games[gameId];
  let playersKeys = Object.keys(game.players);

  if (socket.id !== playersKeys[game.turn]) {
    console.log('[moveCard.js:33] Error is not player turn');
    socket.emit('game:rooms:error', 'No es el teu torn');
    return;
  }

  let player = game.players[socket.id];

  if (!player.cards.includes(card)) {
    console.log('[moveCard.js:41] Error you cannot move a card that you don\'t have');
    socket.emit('game:rooms:error', 'No pots moure una carta que no tens');
    return;
  }

  let formatedCard = card.split('-');
  let cardType = formatedCard[1];
  let cardNumber = parseInt(formatedCard[0]);

  if (game.table[cardType][cardNumber]) {
    socket.emit('game:rooms:error', 'Error #5');
    console.log('Error #5: Card put in table');
    return;
  }

  if (!game.table['o'][5] && (cardNumber !== 5 || cardType !== 'o')) {
    console.log('');
    return;
  }

  if (cardNumber > 5) {
    console.log(`card anterior: ${game.table[cardType][cardNumber-1]} ${cardNumber-1}`);

    if (!game.table[cardType][cardNumber-1]) {
      console.log('Error #6.1');
      return;
    }
  }

  if (cardNumber < 5) {
    console.log(`card anterior: ${game.table[cardType][cardNumber+1]} ${cardNumber+1}`);

    if (!game.table[cardType][cardNumber+1]) {
      console.log('Error #6.2');
      return;
    }
  }

  game.table[cardType][cardNumber] = true;

  socket.emit('game:rooms:move-card:success', card);
  console.log('game:rooms:move-card:success');

  socket.to(`game-${game.id}`).emit('game:rooms:player-move-card:success', card);
  console.log(`[game:rooms:player-move-card:success] game-${game.id} ${card}`);

  nextTurn(io, game);
};
