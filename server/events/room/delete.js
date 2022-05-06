export default (io, debug, rooms, room) => {
  if (!room.startsWith('game-')) return;

  let id = room.replace('game-','');
  let index = rooms.findIndex(r => r.id === id);

  if (index === -1) return;

  rooms.splice(index, 1);
  
  io.to('searching').emit('game:rooms:deleted', id);

  console.log(`room ${room} was deleted`);
};
