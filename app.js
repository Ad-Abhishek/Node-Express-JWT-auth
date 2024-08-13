import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './router/userRouter.js';

const app = express();

app.use(express.json())

dotenv.config();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB database
mongoose
    .connect(process.env.MONGO_URI)
        .then(() => console.log('database connected ✅'))
        .catch((err) => console.error('Database Connection failed ⚠️', err))

app.use(cors());

app.use('/users', userRouter)

app.get('/', (req, res) => {
    res.json({
        msg: "Hello Nepal!"
    });
});

app.listen(PORT, (req, res) => {
  console.log(`Server started on port ${PORT}`);
});
