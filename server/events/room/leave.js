export default (io, debug, games, room, id) => {
  if (debug) console.log(`[debug] [on] [game:rooms:leave] (${room}, ${id})`);
  
  if (!room.startsWith('game-')) return;

  let roomId = room.replace('game-', '');
  let game = games[roomId];

  delete game.players[id];

  // TODO: if 0 players delete game
  // TODO: if owner leave delete game

  let players = Object.keys(game.players).length;

  io.to('searching').emit('game:rooms:update-players-length', roomId, players);

  console.log(`${id} leaved to room ${room}`);
};
