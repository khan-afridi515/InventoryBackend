import 'dotenv/config';
import connectDB from "./database/db.js";
import express from "express";
const app = express();
import { AuthRouter, NotificationApiRouter } from './modules/Auth/index.js';
import { ProductRouter } from './modules/Product/index.js';
import cors from 'cors';

const allowedOrigins = (process.env.CORS_ORIGINS || [
    'http://localhost:5173',
    'https://inventory-frontend-nine-iota.vercel.app',
    'https://inventory-frontend-3h9g.vercel.app'
].join(','))
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
};

app.use(express.json());


app.use(cors(corsOptions));

connectDB();

app.use('/api/v1', AuthRouter);
app.use('/api/v1', NotificationApiRouter);
app.use('/api/v1', ProductRouter);


export { app };

