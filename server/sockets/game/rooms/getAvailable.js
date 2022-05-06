export default (socket, rooms, debug) => {
  if (debug) console.log('[debug] [on] [game:rooms:get-available] ()');

  let availableRooms = rooms.filter(room => room.status === 'waiting');

  socket.emit('game:rooms:get-available', availableRooms);
};
