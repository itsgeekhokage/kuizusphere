/** @format */
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Radio,
  FormControlLabel,
  Box,
  LinearProgress,
  Paper,
  IconButton,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom"; // for routing
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { blue, green, grey } from "@mui/material/colors";

export default function QuizPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { selectedQuestions } = state; // Received questions from Home page

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState({});
  const [progress, setProgress] = useState(0);

  const currentQuestion = selectedQuestions[currentQuestionIndex];

  // Handle answer selection
  const handleAnswerChange = (e) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: e.target.value,
    });
  };

  // Mark question as saved for later
  const handleSaveForLater = () => {
    setStatus({
      ...status,
      [currentQuestion.id]: "saved",
    });
    setProgress(calculateProgress());
  };

  // Mark question for review
  const handleMarkForReview = () => {
    setStatus({
      ...status,
      [currentQuestion.id]: "review",
    });
    setProgress(calculateProgress());
  };

  // Submit the quiz
  const handleSubmit = () => {
    setStatus({
      ...status,
      [currentQuestion.id]: "submitted",
    });
    if (currentQuestionIndex === selectedQuestions.length - 1) {
      // If it's the last question, navigate to results
      navigate("/result", { state: { answers, selectedQuestions } });
    } else {
      handleNext();
    }
  };

  // Calculate progress based on question status
  const calculateProgress = () => {
    const answeredQuestions = Object.keys(status).filter(
      (key) => status[key] === "submitted"
    ).length;
    return (answeredQuestions / selectedQuestions.length) * 100;
  };

  // Move to next question
  const handleNext = () => {
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setProgress(
        ((currentQuestionIndex + 2) / selectedQuestions.length) * 100
      );
    } else {
      navigate("/result", { state: { answers, selectedQuestions } });
    }
  };

  // Render icons for question status in the question tracker
  const renderStatusIcon = (questionId) => {
    if (status[questionId] === "saved") {
      return "#8d8a8a";
    }
    if (status[questionId] === "review") {
      return "#f45252";
    }
    if (status[questionId] === "submitted") {
      return "#11ce8c";
    }
    return "#fcfcfc";
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            style={{ flexGrow: 1 }}>
            Quiz App
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Question Tracker Section */}
      <Container
        maxWidth="lg"
        style={{ padding: "40px 0" }}>
        <Box
          display="flex"
          justifyContent="space-between">
          <Typography variant="h6">
            Question {currentQuestionIndex + 1} of {selectedQuestions.length}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            style={{ width: "60%" }}
          />
        </Box>

        <Box mt={3}>
          <Typography
            variant="h6"
            gutterBottom>
            Question Tracker
          </Typography>
          <Grid
            container
            spacing={2}>
            {selectedQuestions.map((question, index) => (
              <Grid
                item
                key={question.id}>
                <Paper
                      onClick={() => setCurrentQuestionIndex(index)}
                  style={{
                    fontSize : "6px",
                    width : "40px",
                    textAlign: "center",
                    backgroundColor: renderStatusIcon(question.id),
                    color: currentQuestionIndex === index ? "#fff" : "#000",
                }}>
                  <IconButton
                    color="primary">
                    {index + 1}
                  </IconButton>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Question Section */}
        <Box my={3}>
          <Typography
            variant="h5"
            gutterBottom>
            {currentQuestion.question}
          </Typography>
          <Grid
            container
            spacing={2}>
            {currentQuestion.options.map((option, index) => (
              <Grid
                item
                xs={2}
                key={index}>
                <FormControlLabel
                  control={
                    <Radio
                      checked={answers[currentQuestion.id] === option}
                      onChange={handleAnswerChange}
                      value={option}
                    />
                  }
                  label={option}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Action Buttons */}
        <Box
          display="flex"
          justifyContent="space-between"
          mt={3}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSaveForLater}>
            Save for Later
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={handleMarkForReview}>
            Mark for Review
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}>
            {currentQuestionIndex < selectedQuestions.length - 1
              ? "Submit & Next"
              : "Submit & Finish"}
          </Button>
        </Box>
      </Container>
    </div>
  );
}
