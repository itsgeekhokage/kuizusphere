import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export const loginUser = (userId) => {
    socket.emit("login", userId);
};

export const onOnlineUsers = (callback) => {
    socket.on("onlineUsers", callback);
};

export const sendInChatRoom = (toUserId, message) => {
    socket.emit("sendinchatroom", { toUserId, message });
};

export const onChatRoomMsg = (callback) => {
    socket.on("onchatroommsg", callback);
};

export const onPrivateMessage = () => {

}

export const sendPrivateMessage = () => {

}

export const onMatchReq = (callback) => {
    socket.on("onmatchreq", callback);
}

export const sendMatchReq = (data) => {
    socket.emit("matchreq", data);
}

export const sendMatchConfirm = (data) => {
    socket.emit("matchconfirm", data);
}

export const onMatchConfirm = (callback) => {
    socket.on("onmatchconfirm", callback);
}

export const sendMatchDenied = (data) => {
    socket.emit("matchdenied", data);
}

export const onMatchDenied = (callback) => {
    socket.on("onmatchdenied", callback);
}

export const sendMatchProgress = ({to, from, data}) => {
    socket.emit("sendMatchProgress", {to, from, data});
}

export const onMatchProgress = (callback) => {
    socket.on("onMatchProgress", callback);
}