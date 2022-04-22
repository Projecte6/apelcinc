export default (socket, debug, name) => {
  if (debug) console.log(`[debug] [on] [game:login] (${name})`);
  if (!name || name == '') {
    if (debug) console.log(`[debug] [error] Missing or empty name`);
    return;
  }

  socket.name = name.toLowerCase();
  console.log(`[ws] [game:login] ${socket.id} logged as ${socket.name}`);

  socket.join('global');
  
  let message = `${socket.name} se ha conectado`;

  socket.to('global').emit('chat:message', {
    name: 'sistema',
    message,
  });

  if (debug) console.log(`[debug] [to.global.emit] [chat:message] (${socket.name}, ${message})`);
}