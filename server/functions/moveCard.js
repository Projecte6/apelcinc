// Types
import { Socket } from 'socket.io';

// Functions
import canMoveCard from './canMoveCard.js';

/**
 * @param {Socket} socket
 * @param {object} games
 */
export default (socket, game, card) => {
  if (!canMoveCard(game, card)) {
    console.log('Can\'t move the card');
    return false;
  }
  
  // let formatedCard = card.split('-');
  // let cardType = formatedCard[1];
  // let cardNumber = parseInt(formatedCard[0]);
  
  // if (game.table[cardType][cardNumber]) {
  //   socket.emit('game:rooms:error', 'Error #5');
  //   console.log('Error #5: Card put in table');
  //   return;
  // }

  // if (!game.table['o'][5] && (cardNumber !== 5 || cardType !== 'o')) {
  //   console.log('');
  //   return;
  // }

  // if (cardNumber > 5) {
  //   console.log(`card anterior: ${game.table[cardType][cardNumber-1]} ${cardNumber-1}`);

  //   if (!game.table[cardType][cardNumber-1]) {
  //     console.log('Error #6.1');
  //     return;
  //   }
  // }

  // if (cardNumber < 5) {
  //   console.log(`card anterior: ${game.table[cardType][cardNumber+1]} ${cardNumber+1}`);

  //   if (!game.table[cardType][cardNumber+1]) {
  //     console.log('Error #6.2');
  //     return;
  //   }
  // }

  let formatedCard = card.split('-');
  let cardType = formatedCard[1];
  let cardNumber = parseInt(formatedCard[0]);

  game.table[cardType][cardNumber] = true;

  socket.emit('game:rooms:move-card:success', card);
  socket.to(`game-${game.id}`).emit('game:rooms:player-move-card:success', card);

  return true;
};
