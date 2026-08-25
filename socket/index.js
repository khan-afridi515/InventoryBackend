import { Server } from 'socket.io';

let io;

const allowedOrigins = (process.env.CORS_ORIGINS || [
  'http://localhost:5173',
  'https://inventory-frontend-nine-iota.vercel.app',
].join(','))
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: allowedOrigins,
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
