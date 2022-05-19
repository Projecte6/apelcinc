export default (socket, debug, games) => {
  if (debug) console.log('[debug] [on] [game:rooms:get-available] ()');

  let waitingRooms = [];

  for (let property in games) {
    let game = games[property];

    if (game.status !== 'waiting' || game.type !== 'public') continue;

    waitingRooms.push({
      id: game.id,
      name: game.name,
      players: Object.keys(game.players).length,
      type: game.type,
    });
  }

  socket.emit('game:rooms:get-available', waitingRooms);
};
