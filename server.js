
import 'dotenv/config';
import http from 'http';

import { app } from "./app.js";
import { initializeSocket } from "./socket/index.js";

const server = http.createServer(app);
initializeSocket(server);

server.listen(3000, () => {
    console.log("Port is running on 3000");
});

