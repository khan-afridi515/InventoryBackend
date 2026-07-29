import { Server } from 'socket.io';

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ['http://localhost:5173', 'https://inventory-frontend-nine-iota.vercel.app'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    socket.on('disconnect', () => {
      // no-op
    });
  });

  return io;
};

const emitProductSold = (payload) => {
  if (io) {
    io.emit('productSold', payload);
  }
};

export { initializeSocket, emitProductSold };
