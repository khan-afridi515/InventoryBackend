import 'dotenv/config';
import connectDB from "./database/db.js";
import express from "express";
const app = express();
import { AuthRouter, NotificationApiRouter } from './modules/Auth/index.js';
import { ProductRouter } from './modules/Product/index.js';
import cors from 'cors';


app.use(express.json());



app.use(cors({
    origin: ["http://localhost:5173", "https://inventory-frontend-nine-iota.vercel.app"],
    credentials: true
})
)

connectDB();

app.use('/api/v1', AuthRouter);
app.use('/api/v1/ebay/notifications', NotificationApiRouter);
app.use('/api/v1', ProductRouter);


export { app };

