// server.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Replace with your React app's URL
        methods: ["GET", "POST"]
    }
});

app.use(cors({
    origin: "http://localhost:5173" // Replace with your React app's URL
}));

const questions = [
    { id: 1, question: "What is the capital of France?", answer: "Paris" },
    { id: 2, question: "What is 2 + 2?", answer: "4" },
    { id: 3, question: "What is the capital of Japan?", answer: "Tokyo" },
    { id: 4, question: "What is 3 + 5?", answer: "8" },
    { id: 5, question: "What is the capital of Italy?", answer: "Rome" },
    { id: 6, question: "What is 7 + 6?", answer: "13" }
];

const userProgress = {};
const roomUsers = {}; // Track users in each room
const onlineUsers = {}; // Track online users

const initializeSocket = (io) => {
    io.on('connection', (socket) => {
        console.log(`New client connected: ${socket.id}`);

        socket.on('register', (username) => {
            socket.username = username;
            onlineUsers[username] = socket.id;
            io.emit('updateOnlineUsers', Object.keys(onlineUsers)); // Notify all users of the updated online list
            console.log(`User connected: ${username}, Socket ID: ${socket.id}`);
            socket.emit('socketId', username);
        });

        socket.on('challengeUser', (challengedUser) => {
            const challenger = socket.username;
            if (onlineUsers[challengedUser]) {
                io.to(onlineUsers[challengedUser]).emit('challengeReceived', { challenger });
                socket.emit('challengeSent', { challengedUser });
            } else {
                socket.emit('challengeFailed', { message: 'User not online' });
            }
        });

        socket.on('acceptChallenge', (challenger) => {
            const room = `${challenger}_vs_${socket.username}`;
            socket.join(room);
            io.to(onlineUsers[challenger]).emit('challengeAccepted', { room });
            io.to(room).emit('quizStarted', { message: 'Quiz started', questions });
            roomUsers[room] = [challenger, socket.username];
            userProgress[room] = {
                [challenger]: { score: 0, startTime: Date.now(), answers: [] },
                [socket.username]: { score: 0, startTime: Date.now(), answers: [] }
            };
        });

        socket.on('rejectChallenge', (challenger) => {
            io.to(onlineUsers[challenger]).emit('challengeRejected', { rejectedUser: socket.username });
        });

        socket.on('questionSubmitted', (data) => {
            const { room, questionIndex, answer } = data;
            const isCorrect = answer.toLowerCase() === questions[questionIndex].answer.toLowerCase();

            if (userProgress[room] && userProgress[room][socket.username]) {
                userProgress[room][socket.username].score += isCorrect ? 1 : 0;
                userProgress[room][socket.username].answers.push({ questionIndex, answer, isCorrect });
                socket.to(room).emit('progressUpdate', { userId: socket.username, questionIndex, isCorrect });
            }
        });

        socket.on('submitQuiz', (room) => {
            if (userProgress[room] && userProgress[room][socket.username]) {
                userProgress[room][socket.username].endTime = Date.now();
                const userScores = Object.keys(userProgress[room]).map(user => {
                    const { score, startTime, endTime } = userProgress[room][user];
                    return { username: user, score, timeTaken: endTime - startTime };
                });
                const sortedScores = userScores.sort((a, b) => {
                    if (a.score === b.score) {
                        return a.timeTaken - b.timeTaken;
                    }
                    return b.score - a.score;
                });
                io.to(room).emit('quizResult', sortedScores);
                delete roomUsers[room]; // Reset roomUsers for next quiz
                delete userProgress[room]; // Reset userProgress for next quiz
            }
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
            if (socket.username) {
                delete onlineUsers[socket.username];
                io.emit('updateOnlineUsers', Object.keys(onlineUsers)); // Notify all users of the updated online list
                for (const room in roomUsers) {
                    roomUsers[room] = roomUsers[room].filter(user => user !== socket.username);
                    if (roomUsers[room].length === 0) {
                        delete roomUsers[room]; // Clean up empty rooms
                    }
                }
            }
        });
    });
};

// Initialize socket
initializeSocket(io);

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
