/** @format */
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom"; // for routing

export default function ResultPage() {
  const { state } = useLocation();
  const { answers, selectedQuestions } = state;
  const navigate = useNavigate();

  // Calculate score
  const correctAnswers = selectedQuestions.filter(
    (q) => answers[q.id] === q.correctAnswer
  ).length;
  const score = (correctAnswers / selectedQuestions.length) * 100;

  return (
    <div>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            style={{ flexGrow: 1 }}>
            Quiz Result
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Result Summary */}
      <Container
        maxWidth="lg"
        style={{ padding: "40px 0" }}>
        <Box
          textAlign="center"
          mb={3}>
          <Typography variant="h4">Your Score: {score}%</Typography>
          <Typography variant="h6">
            Correct Answers: {correctAnswers} / {selectedQuestions.length}
          </Typography>
        </Box>

        {/* Question Breakdown */}
        {selectedQuestions.map((question) => (
          <Card
            key={question.id}
            style={{
              backgroundColor:
                answers[question.id] === question.correctAnswer
                  ? "#2ecc71"
                  : "#e74c3c",
              color: "#fff",
              marginBottom: "10px",
            }}>
            <CardContent>
              <Typography variant="h6">{question.question}</Typography>
              <Typography variant="body2">
                Your Answer: {answers[question.id]}
              </Typography>
              <Typography variant="body2">
                Correct Answer: {question.correctAnswer}
              </Typography>
            </CardContent>
          </Card>
        ))}

        {/* Buttons */}
        <Box
          textAlign="center"
          mt={5}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/")}>
            Go Back to Home
          </Button>
        </Box>
      </Container>
    </div>
  );
}
