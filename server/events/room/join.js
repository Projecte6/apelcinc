export default (debug, room, id) => {
  if (!room.startsWith('game-')) return;
  
  // if (room === 'global') {
  //   // ...
  //   return;
  // }

  console.log(`${id} joined to room ${room}`);
};