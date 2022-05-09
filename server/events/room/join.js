export default (io, debug, room, id) => {
  if (!room.startsWith('game-')) return;

  let roomId = room.replace('game-', '');
  let players = Array.from(io.sockets.adapter.rooms.get(room)).length;

  io.to('searching').emit('game:rooms:update-players-length', roomId, players );
  
  // if (room === 'global') {
  //   // ...
  //   return;
  // }

  console.log(`${id} joined to room ${room}`);
};