export default (debug, room, id) => {
  if (!room.startsWith('game-')) return;
  
  // if (room === 'global') {
  //   // ...
  //   return;
  // }

  console.log(`${id} leaved to room ${room}`);
};
