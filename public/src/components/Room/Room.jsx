/** @format */

import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000"); // Adjust the URL as necessary

const Room = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get(`/api/rooms/${id}/questions`);
      setQuestions(response.data);
    };
    fetchQuestions();

    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [id]);

  useEffect(() => {
    socket.on("answer", (data) => {
      if (
        data.questionId === questions[currentQuestionIndex]._id &&
        data.userId !== socket.id
      ) {
        setIsAnswered(true);
      }
    });

    return () => socket.off("answer");
  }, [questions, currentQuestionIndex]);

  const handleAnswer = async (option) => {
    if (isAnswered) return;

    const question = questions[currentQuestionIndex];
    const isCorrect = option === question.correctOption;
    if (isCorrect) {
      setScore(score + 1);
      socket.emit("answer", { questionId: question._id, userId: socket.id });
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setIsAnswered(false);
  };

  if (questions.length === 0) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Box mt={8}>
        <Typography variant="h4">Room: {id}</Typography>
        <Typography variant="h6">Score: {score}</Typography>
        <Typography variant="h6">Time: {time} seconds</Typography>
        {currentQuestionIndex < questions.length ? (
          <Box mt={4}>
            <Typography variant="h5">
              {questions[currentQuestionIndex].questionText}
            </Typography>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <Button
                key={index}
                variant="contained"
                color="primary"
                onClick={() => handleAnswer(option)}
                sx={{ mt: 2 }}
                disabled={isAnswered}>
                {option}
              </Button>
            ))}
          </Box>
        ) : (
          <Typography variant="h5">Quiz Completed!</Typography>
        )}
      </Box>
    </Container>
  );
};

export default Room;
