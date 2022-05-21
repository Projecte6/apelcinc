// Types
import { Socket } from 'socket.io';

/**
 * @param {Socket} socket
 * @param {object} games
 */
export default (game, card) => {
  let formatedCard = card.split('-');
  let cardType = formatedCard[1];
  let cardNumber = parseInt(formatedCard[0]);
  
  if (game.table[cardType][cardNumber]) {
    console.log('Error #5: Card put in table');
    return false;
  }

  if (!game.table['o'][5] && (cardNumber !== 5 || cardType !== 'o')) {
    console.log('');
    return false;
  }

  if (cardNumber > 5) {
    console.log(`card anterior: ${game.table[cardType][cardNumber-1]} ${cardNumber-1}`);

    if (!game.table[cardType][cardNumber-1]) {
      console.log('Error #6.1');
      return false;
    }
  }

  if (cardNumber < 5) {
    console.log(`card anterior: ${game.table[cardType][cardNumber+1]} ${cardNumber+1}`);

    if (!game.table[cardType][cardNumber+1]) {
      console.log('Error #6.2');
      return false;
    }
  }

  return true;
};
