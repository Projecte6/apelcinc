export default (socket, debug, games) => {
  if (debug) console.log('[debug] [on] [game:rooms:get-available] ()');

  let waitingRooms = [];

  for (let property in games) {
    let game = games[property];

    if (game.status !== 'waiting') continue;

    waitingRooms.push({
      id: game.id,
      name: game.name,
      players: Object.keys(game.players).length,
      type: 'Publica',
    });
  }

  socket.emit('game:rooms:get-available', waitingRooms);
};
