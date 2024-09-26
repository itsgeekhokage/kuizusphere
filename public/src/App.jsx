/** @format */

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import QuizPage from "./components/Quizpage";
import ResultPage from "./components/Resultpage";
import AuthPage from "./components/AuthPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}>  </Route>
        <Route path="/login" element={<AuthPage/>}>  </Route>
        <Route path="/quiz" element={<QuizPage/>}>  </Route>
        <Route path="/result" element={<ResultPage/>}>  </Route>
      </Routes>
    </Router>
  );
}

export default App;
