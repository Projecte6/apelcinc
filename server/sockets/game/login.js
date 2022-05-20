// Types
import { Server, Socket } from 'socket.io';

/**
 * @param {Server} io
 * @param {Socket} socket
 * @param {boolean} debug
 */
export default (socket, debug, usernames, name = '') => {
  if (debug) console.log(`[debug] [on] [game:login] (${name})`);

  name = name.replaceAll(' ', '').toLowerCase();

  if (!name || name == '') {
    if (debug) console.log(`[debug] [error] Missing or empty name`);
    return;
  }

  if (usernames.includes(name)) {
    let message = 'Nom d\'usuari en ús';
    socket.emit('game:login:error', message);
    return;
  }

  socket.data.name = name;
  usernames.push(name);

  // socket.name = name;

  console.log(`[ws] [game:login] ${socket.id} logged as ${socket.data.name} connected`);

  socket.join('global');

  let message = `${socket.data.name} se ha conectado`;

  socket.emit('game:login:success');

  socket.to('global').emit('chat:message', {
    name: 'sistema',
    message,
  });

  if (debug) console.log(`[debug] [to.global.emit] [chat:message] (${socket.name}, ${message})`);
};
