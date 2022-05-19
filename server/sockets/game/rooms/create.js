import { nanoid } from 'nanoid';
import lodash from 'lodash';

// Types
import { Socket } from 'socket.io';

/**
 * @param {Socket} socket
 * @param {string} debug
 * @param {Array<string>} cards
 * @param {object} games
 * @param {string} name
 */
export default async (socket, debug, cards, games, name) => {
  let id = nanoid(5);

  let clonedCards = lodash.cloneDeep(cards);
  let suffledCards = lodash.shuffle(clonedCards);

  name = name.replaceAll(' ', '').toLowerCase();
  
  if (!name || name == '') {
    if (debug) console.log(`[debug] [error] Missing or empty name`);
    return;
  }

  if (name.length < 2) {
    let message = 'El nom de la sala ha de tenir una llargada de 2 caràcters';
    socket.emit('game:create:error', message);
    return;
  }

  games[id] = {
    id: id,
    name: name,
    status: 'waiting',
    turn: null,
    cards: suffledCards,
    players: {},
    table: {
      'o': {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
      },
      'e': {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
      },
      'c': {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
      },
      'b': {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
      },
    }
  };

  games[id].players[socket.id] = { cards: [] };

  let room = { id, name };

  await socket.join(`game-${id}`);
  await socket.leave('global');

  socket.emit('game:rooms:create:success', room);
  socket.to('searching').emit('game:rooms:created', room);
};
