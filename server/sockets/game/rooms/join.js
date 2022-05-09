export default (io, socket, debug, id) => {
  socket.join(`game-${id}`);
};
