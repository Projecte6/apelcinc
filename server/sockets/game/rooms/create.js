// import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';

export default (socket, debug, rooms, name) => {
  let id = nanoid(5);

  let room = {
    id: id,
    name: name,
    status: 'waiting',
  };

  rooms.push(room);

  socket.join(`game-${id}`);
  socket.emit('game:rooms:create', room);
  socket.to('searching').emit('game:rooms:created', room);


  // if (debug) console.log(`[debug] [on] [game:login] (${name})`);
  // if (!name || name == '') {
  //   if (debug) console.log(`[debug] [error] Missing or empty name`);
  //   return;
  // }

  // socket.name = name.toLowerCase();
  // console.log(`[ws] [game:login] ${socket.id} logged as ${socket.name}`);

  // socket.join('global');
  
  // let message = `${socket.name} se ha conectado`;

  // socket.to('global').emit('chat:message', {
  //   name: 'sistema',
  //   message,
  // });

  // if (debug) console.log(`[debug] [to.global.emit] [chat:message] (${socket.name}, ${message})`);
}