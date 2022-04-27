export default (socket, rooms, debug) => {
  if (debug) console.log('[debug] [on] [game:rooms:get-available] ()');

  let availableRooms = rooms.filter(room => room.status === 'waiting');

  if (availableRooms.length === 0) return;

  socket.emit('game:rooms:get-available', availableRooms);

  // Add socket to new room called searching
};
