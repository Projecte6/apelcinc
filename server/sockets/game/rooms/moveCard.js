// Types
import { Server, Socket } from 'socket.io';

/**
 * @param {Server} io
 * @param {Socket} socket
 * @param {boolean} debug
 * @param {object} games
 */
export default (io, socket, debug, games, card) => {
  console.log(`[game:rooms:move-card] ${card}`);

  if (!card) {
    console.log('Error #1');
    return;
  }

  let rooms = Array.from(socket.rooms.values());
  let joinedGames = rooms.filter(r => r.startsWith('game-'));

  console.log(`joinedGames: ${joinedGames}`);
  console.log(`length: ${joinedGames.length}`);

  if (joinedGames.length !== 1) {
    console.log('Error #2');
    return;
  }

  let id = joinedGames[0].replace('game-', '');
  //
  let game = games[id];

  let playersIds = Object.keys(game.players);

  console.log(`socket.id: ${socket.id}`);
  console.log(`playerTurn: ${playersIds[game.turn]}`);

  if (socket.id !== playersIds[game.turn]) {
    console.log('Error #3');
    return;
  }

  let player = game.players[socket.id];

  console.log(`card: ${card}`);
  console.log(`player.cards: ${player.cards}`);

  if (!player.cards.includes(card)) {
    console.log('Error #4');
    return;
  }

  // if ()

  let random = Math.round(Math.random());

  if (random === 1) {
    socket.emit('game:rooms:move-card:success', card);
    console.log('game:rooms:move-card:success');
    
    socket.to(`game-${id}`).emit('game:rooms:player-move-card:success', card);
    console.log(`[game:rooms:player-move-card:success] game-${id} ${card}`);
    return;
  }

  if (random === 0) {
    let message = 'No puedes tirar esta carta';
    socket.emit('game:rooms:move-card:error', message);
    console.log('game:rooms:move-card:error');
    return;
  }

  // let game = games[socket.game];

  // if (game.players[game.turn].id !== socket.id) {
  //   if (debug) console.log(`[debug] [error] Not this player's turn`);
  //   return;
  // }

  // let index = game.players.findIndex(p => p.id === socket.id);

  // if (index === -1) return;

  // let gamePlayer = game.players[index];

  // if (game.players)


  // Success
  // socket.emit('game:rooms:move-card:error', message);

  // Error
  // socket.emit('game:rooms:move-card:success');

  // socket.join(`game-${id}`);
  // socket.emit('game:rooms:join:success');
  // io.to(`game-${id}`).emit('game:room:player-join', socket.username);
};
