export default (io, debug, games, room, id) => {
  if (!room.startsWith('game-')) return;

  let roomId = room.replace('game-', '');
  let players = Object.keys(games[roomId].players).length;

  io.to('searching').emit('game:rooms:update-players-length', roomId, players);
  // io.to(room).emit('game:room:player-join', socket.username);

  console.log(`${id} joined to room ${room}`);
};
