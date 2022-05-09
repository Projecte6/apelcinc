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
};
