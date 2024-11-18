import { Server } from "socket.io";

const setupSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    const onlineUsers = {};

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        socket.on("login", (userId) => {
            onlineUsers[userId] = socket.id;
            io.emit("onlineUsers", Object.keys(onlineUsers));
            console.log("User logged in:", userId);
        });

        socket.on("matchreq", (toUserId) => {
            const recipientSocketId = onlineUsers[toUserId];
            if (recipientSocketId) {
                io.to(recipientSocketId).emit("onmatchreq",
                    Object.keys(onlineUsers).find(id => onlineUsers[id] === socket.id)
                );
            }
        });

        socket.on("matchconfirm", ({toUserId, client, match}) => {
            const recipientSocketId = onlineUsers[toUserId];
            if (recipientSocketId) {
                io.to(recipientSocketId).emit("onmatchconfirm",
                    {client,
                    match}
                );
            }
        });

        socket.on("matchdenied", (toUserId) => {
            const recipientSocketId = onlineUsers[toUserId];
            if (recipientSocketId) {
                io.to(recipientSocketId).emit("onmatchdenied",
                    Object.keys(onlineUsers).find(id => onlineUsers[id] === socket.id)
                );
            }
        });

        socket.on("sendMatchProgress", ({ to, from, data }) => {
            const recipientSocketId = onlineUsers[to];
            if (recipientSocketId) {
                io.to(recipientSocketId).emit("onMatchProgress", {
                    from: Object.keys(onlineUsers).find(id => onlineUsers[id] === socket.id),
                    data
                });
            }
        });

        socket.on("sendinchatroom", ({ toUserId, data }) => {
            const recipientSocketId = onlineUsers[toUserId];
            if (recipientSocketId) {
                io.to(recipientSocketId).emit("onchatroommsg", {
                    from: Object.keys(onlineUsers).find(id => onlineUsers[id] === socket.id),
                    data
                });
            }
        });

        socket.on("disconnect", () => {
            const userId = Object.keys(onlineUsers).find(key => onlineUsers[key] === socket.id);
            if (userId) {
                delete onlineUsers[userId];
                io.emit("onlineUsers", Object.keys(onlineUsers));
                console.log("User disconnected:", userId);
            }
        });
    });
};

export default setupSocket;
