export default (socket, debug, message) => {
  if (debug) console.log(`[debug] [on] [chat:message] (${message})`);
  if (!message || message == '' || !socket.name) {
    if (debug) console.log(`[debug] [error] Missing or empty message or undefined name`);
    return;
  }

  console.log(`[ws] [chat:message] ${socket.name}: ${message}`);

  socket.broadcast.emit('chat:message', {
    name: socket.name,
    message,
  });

  if (debug) console.log(`[debug] [brodcast.emit] [chat:message] (${socket.name}, ${message})`);
}