
import 'dotenv/config';
import http from 'http';

import { app } from "./app.js";
import { initializeSocket } from "./socket/index.js";

const server = http.createServer(app);
initializeSocket(server);

const port = Number(process.env.PORT) || 3000;

server.listen(port, "0.0.0.0", () => {
    console.log(`Port is running on ${port}`);
});

