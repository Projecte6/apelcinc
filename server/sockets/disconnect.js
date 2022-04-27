export default (socket, debug) => {
  if (debug) console.log(`[debug] [on] [disconnect]`);
  console.log(`[ws] [disconnect] ${socket.id} ${socket.name ? `logged as ${socket.name}` : ''} disconnected`);

  let message = `${socket.name} se ha desconectado`;

  socket.to('global').emit('chat:message', {
    name: 'sistema',
    message,
  });
}