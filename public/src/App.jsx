/** @format */

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Dashboard/Home";
import CreateRoom from "./components/Dashboard/CreateRoom";
import JoinRoom from "./components/Dashboard/JoinRoom";
import Room from "./components/Room/Room";
import GlobalRoom from "./components/GlobalRoom/GlobalRoom";
import Welcome from "./components/Dashboard/Welcome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route
          path="/login"
          element={<Login/>}
        />
        <Route
          path="/register"
          element={<Register/>}
        />
        <Route
          path="/home"
          element={<Home/>}
        />
        <Route
          path="/create-room"
          element={<CreateRoom/>}
        />
        <Route
          path="/join-room"
          element={<JoinRoom/>}
        />
        <Route
          path="/room/:id"
          element={<Room/>}
        />
        <Route
          path="/global-room"
          element={<GlobalRoom/>}
        />
        <Route
          path="/"
          element={<Login/>}
        />
      </Routes>
    </Router>
  );
}

export default App;
