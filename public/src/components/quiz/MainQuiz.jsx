/** @format */

import React, { useState } from "react";
import { Box, Button, Typography, Pagination, Avatar } from "@mui/material";
import Question from "./Question";
import { useNavigate } from "react-router-dom";

const MainQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(5).fill(null));
  const [markedForReview, setMarkedForReview] = useState(Array(5).fill(false));

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

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleChangeAnswer = (event) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = event.target.value;
    setAnswers(updatedAnswers);
  };

  const handleMarkForReview = () => {
    const updatedMarkedForReview = [...markedForReview];
    updatedMarkedForReview[currentQuestion] =
      !updatedMarkedForReview[currentQuestion];
    setMarkedForReview(updatedMarkedForReview);
  };

  const handlePageChange = (event, value) => {
    setCurrentQuestion(value - 1);
  };

  return (
    <Box
      sx={{
        margin: "0 auto",
        padding: 4,
        display: "flex",
        justifyContent: "space-around",
      }}>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2vw",
            width: "60vw",
          }}>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={questions.length}
              page={currentQuestion + 1}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
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
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            {currentQuestion > 0 && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handlePrevQuestion}>
                Previous
              </Button>
            )}
            <Button
              variant="outlined"
              color="warning"
              onClick={handleMarkForReview}>
              {markedForReview[currentQuestion]
                ? "Unmark for Review"
                : "Mark for Review"}
            </Button>
            {currentQuestion < questions.length && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNextQuestion}>
                Next
              </Button>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
            }}></Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderLeft: "2px dotted grey",
          padding: 3,
        }}>
        <Button variant="contained" onClick={()=>navigate("/submit")}>
          Submit
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            flexWrap: "wrap",
          }}>
          {answers.map((answer, index) => (
            <Avatar
              key={index}
              variant="body2"
              sx={{
                backgroundColor:
                  answer !== null
                    ? "green"
                    : markedForReview[index]
                    ? "orange"
                    : "red",
                mx: 0.5,
                height: "2vw",
                width: "2vw",
                borderRadius: "50%",
              }}>
              {index + 1}
            </Avatar>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MainQuiz;
