export default (socket, debug, usernames) => {
  if (debug) console.log(`[debug] [on] [disconnect]`);
  console.log(`[ws] [disconnect] ${socket.id} ${socket.name ? `logged as ${socket.name}` : ''} disconnected`);

  let index = usernames.indexOf(socket.name);

  if (index !== -1) {
    usernames.splice(index, 1);
  }

  let message = `${socket.name} se ha desconectado`;

  socket.to('global').emit('chat:message', {
    name: 'Sistema',
    message,
  });
}
