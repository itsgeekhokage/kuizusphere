/** @format */

import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Question from "./Question";

const MainQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(5).fill(null)); // Assuming 5 questions

  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "Madrid", "Rome"],
    },
    {
      id: 2,
      question: "Who wrote 'Harry Potter' series?",
      options: [
        "J.K. Rowling",
        "Stephen King",
        "George R.R. Martin",
        "Dan Brown",
      ],
    },
    {
      id: 3,
      question: "Which planet is known as the Red Planet?",
      options: ["Mars", "Jupiter", "Saturn", "Uranus"],
    },
    {
      id: 4,
      question: "Which is the largest ocean on Earth?",
      options: [
        "Pacific Ocean",
        "Indian Ocean",
        "Atlantic Ocean",
        "Arctic Ocean",
      ],
    },
    {
      id: 5,
      question: "Who painted the Mona Lisa?",
      options: [
        "Leonardo da Vinci",
        "Pablo Picasso",
        "Vincent van Gogh",
        "Michelangelo",
      ],
    },
  ];

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleChangeAnswer = (event) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = event.target.value;
    setAnswers(updatedAnswers);
  };

  return (
    <Box sx={{ width: "70%", margin: "0 auto", paddingTop: 2 }}>
      {currentQuestion < questions.length ? (
        <Question
          question={questions[currentQuestion].question}
          options={questions[currentQuestion].options}
          selectedOption={answers[currentQuestion]}
          handleChange={handleChangeAnswer}
        />
      ) : (
        <Typography
          variant="h5"
          align="center">
          Quiz Completed! Thank you.
        </Typography>
      )}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        {currentQuestion < questions.length - 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextQuestion}>
            Next Question
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default MainQuiz;
