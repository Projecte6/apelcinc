export default (io, socket, rooms, debug) => {
  if (debug) console.log('[debug] [on] [game:rooms:get-available] ()');

  let availableRooms = rooms.filter(room => room.status === 'waiting');

  for (let room of availableRooms) {
    room.players = Array.from(io.sockets.adapter.rooms.get(`game-${room.id}`)).length;
  }

  socket.emit('game:rooms:get-available', availableRooms);
};
