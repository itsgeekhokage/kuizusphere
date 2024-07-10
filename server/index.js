// server.js

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config/config.js';
import authRouter from './routes/auth.js';
import roomRouter from './routes/rooms.js';
import quizRouter from './routes/quizzes.js';
import profileRouter from './routes/profile.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/quizzes', quizRouter);
app.use('/api/profile', profileRouter);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
