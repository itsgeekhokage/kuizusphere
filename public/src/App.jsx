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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route
          path="/login"
          component={Login}
        />
        <Route
          path="/register"
          component={Register}
        />
        <Route
          path="/home"
          component={Home}
        />
        <Route
          path="/create-room"
          component={CreateRoom}
        />
        <Route
          path="/join-room"
          component={JoinRoom}
        />
        <Route
          path="/room/:id"
          component={Room}
        />
        <Route
          path="/global-room"
          component={GlobalRoom}
        />
        <Route
          path="/"
          component={Login}
        />
      </Routes>
    </Router>
  );
}

export default App;
