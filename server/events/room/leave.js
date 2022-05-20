export default (io, debug, games, room, id) => {
  if (debug) console.log(`[debug] [on] [game:rooms:leave] (${room}, ${id})`);
  
  if (!room.startsWith('game-')) return;

  let gameId = room.replace('game-', '');

  delete games[gameId];
  io.to('searching').emit('game:rooms:deleted', id);

  console.log(`room ${room} was deleted`);
};
