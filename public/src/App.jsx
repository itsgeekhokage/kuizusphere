/** @format */

import React, { useEffect, useState } from "react";
import {
  loginUser,
  onOnlineUsers,
  sendPrivateMessage,
  onPrivateMessage,
  onMatchReq,
} from "./socket";
import Main from "./components/Homepage/Main";
import Login from "./components/Auth/Login";

import {createBrowserRouter, RouterProvider, useNavigate} from "react-router-dom";
import QuizPage from "./components/Quizpage/Main";
import MatchReq from "./components/Homepage/MatchReq";
import { useSelector } from "react-redux";
import ResultPage from "./components/ResultPage/Result";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [],
  },
  {
    path: "/quiz",
    element: <QuizPage />,
    children: [],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path : "result",
    element : <ResultPage/>
  }
]);

function App() {
  const userId = useSelector((state) => state.user?.user?.username);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);


useEffect(() => {
  onOnlineUsers((users) => setOnlineUsers(users));

  const handleMessage = (data) => {
    setChatMessages((prev) => [
      ...prev,
      { from: data.from, message: data.message },
    ]);
  };


  onPrivateMessage(handleMessage);


  return () => {
    socket.off("onlineUsers");
    socket.off("privateMessage");
    socket.off("onmatchreq");
  };
}, []);

useEffect(() => {
  if (userId && !onlineUsers.includes(userId)) loginUser(userId);
})


  const handleSelectUser = (user) => {
    setActiveChat(user);
  };

  const handleSendMessage = () => {
    if (activeChat && message) {
      sendPrivateMessage(activeChat, message);
      setChatMessages((prev) => [...prev, { from: "You", message }]);
      setMessage("");
    }
  };

  const handleRandomChat = () => {
    const randomUser =
      onlineUsers[Math.floor(Math.random() * onlineUsers.length)];
    if (randomUser && randomUser !== userId) {
      setActiveChat(randomUser);
    }
  };


  return (
    <>
      {/* <h1>Online Users</h1>

      <input
        type="text"
        placeholder="Enter your user ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      <h2>Users Online</h2>
      <ul>
        {onlineUsers.map(
          (user) =>
            user !== userId && (
              <li key={user}>
                {user}
                <button onClick={() => handleSelectUser(user)}>Chat</button>
              </li>
            )
        )}
      </ul>

      <button onClick={handleRandomChat}>Chat with Random User</button>

      {activeChat && (
        <div>
          <h3>Chatting with {activeChat}</h3>
          <div>
            {chatMessages.map((msg, index) => (
              <p key={index}>
                <strong>{msg.from}:</strong> {msg.message}
              </p>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      )} */}

    <RouterProvider router={router}>

    </RouterProvider>
    </>
  );
}

export default App;
