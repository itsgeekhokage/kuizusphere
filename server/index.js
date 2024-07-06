import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { MONGO_URI } from './config.js';
import authRoutes from './routes/auth.js';
import roomRoutes from './routes/room.js';
import quizRoutes from './routes/quiz.js';

const app = express();

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('MongoDB connection error:', error));

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/quizzes', quizRoutes);

const server = app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

import { Server } from 'socket.io';
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinGlobalRoom', () => {
        // Matchmaking logic here
    });

    socket.on('answer', (data) => {
        io.emit('answer', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
