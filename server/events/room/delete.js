export default (io, debug, games, room) => {
  if (!room.startsWith('game-')) return;

  let id = room.replace('game-','');
  delete games[id];
  
  io.to('searching').emit('game:rooms:deleted', id);

  console.log(`room ${room} was deleted`);
};
