
export const initializeSocket = (io) => {
    io.on('connection', (socket) => {
        console.log(`New client connected: ${socket.id}`);

        socket.on('register', (username) => {
            socket.id = username;
            console.log(`User connected: ${username}, Socket ID: ${username}`);
            socket.emit('socketId', username);
        });

        socket.on('start5ques', () => {
            const room = '5QuesRoom';
            socket.join(room);
            console.log(`${socket.id} joined ${room}`);
            socket.emit('quizStarted', { message: '5 questions quiz started' });
        });

        socket.on('start10ques', () => {
            const room = '10QuesRoom';
            socket.join(room);
            console.log(`${socket.id} joined ${room}`);
            socket.emit('quizStarted', { message: '10 questions quiz started' });
        });

        socket.on('start20ques', () => {
            const room = '20QuesRoom';
            socket.join(room);
            console.log(`${socket.id} joined ${room}`);
            socket.emit('quizStarted', { message: '20 questions quiz started' });
        });


        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};
