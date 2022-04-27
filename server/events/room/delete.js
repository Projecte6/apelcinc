export default (debug, rooms, room) => {
  if (!room.startsWith('game-')) return;

  let index = rooms.findIndex(r => r.id === room);

  if (index === -1) return;

  rooms.splice(index, 1);

  console.log(`room ${room} was deleted`);
};
