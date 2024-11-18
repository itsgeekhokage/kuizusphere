/** @format */

import React, { useEffect, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { blue, green, grey } from "@mui/material/colors";
import { onMatchProgress, sendMatchProgress } from "../../socket";
import { useSelector } from "react-redux";
import { updateMatchScores } from "../../apis/match";

export default function QuizPage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user?.username);
  const [oppo, setOppo] = useState("");
  const [match, setMatch] = useState("");
  const location = useLocation();

  useEffect(() => {
    if(location?.state){
      console.log(location.state)
      setOppo(location.state?.client);
      setMatch(location.state?.match);
    }
  }, [location.state]);

  const selectedQuestions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      ans : "Paris"
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      ans : "Mars"
    },
    {
      id: 3,
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Jane Austen"],
      ans : "J.K. Rowling"
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState({});
  const [oppStatus, setOppStatus] = useState({});
  const [progress, setProgress] = useState(0);

  const currentQuestion = selectedQuestions[currentQuestionIndex];

  const calculateScore = () => {
    let score = 0;
    selectedQuestions.forEach((question) => {
      if (answers[question.id] === question.ans) {
        score += 1;
      }
    });
    return score;
  };


  const handleAnswerChange = (e) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: e.target.value,
    });
  };

  const handleSaveForLater = () => {
    const temp = {
      ...status,
      [currentQuestion.id]: "saved",
    };
    setStatus(temp);
    setProgress(calculateProgress());
    sendMatchProgress({to : oppo, from : user, data : temp});
  };

  const handleMarkForReview = () => {
    const temp = {
      ...status,
      [currentQuestion.id]: "review",
    };
    setStatus(temp);
    setProgress(calculateProgress());
    sendMatchProgress({ to: oppo, from: user, data: temp });
  };

  const handleSubmit = async () => {
    const temp = {
      ...status,
      [currentQuestion.id]: "submitted",
    };
    setStatus(temp);
    if (currentQuestionIndex === selectedQuestions.length - 1) {
      try {
        const score = calculateScore();
        console.log(match, user, score);
        const response = await updateMatchScores(match, user, score);
        if(response){
          navigate("/result", { state: match });
        }
        else{
          alert("server problem");
        }
      } catch (error) {
        console.error("Navigation failed: ", error);
      }
    } else {
      handleNext();
    }
    sendMatchProgress({ to: oppo, from: user, data: temp });
  };

  const calculateProgress = () => {
    const answeredQuestions = Object.keys(status).filter(
      (key) => status[key] === "submitted"
    ).length;
    return (answeredQuestions / selectedQuestions.length) * 100;
  };

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

  const renderStatusIcon = (stat, questionId) => {
    if (stat[questionId] === "saved") {
      return "#3178eb";
    }
    if (stat[questionId] === "review") {
      return "#f45252";
    }
    if (stat[questionId] === "submitted") {
      return "#11ce8c";
    }
    return "#fcfcfc";
  };

  useEffect(() => {
    const handleOppUpdate = (data) => {
      setOppStatus(data.data);
    }
    onMatchProgress(handleOppUpdate);
  }, []);

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
            Your Progress
          </Typography>
          <Grid
            container
            spacing={2}>
            {selectedQuestions?.map((question, index) => (
              <Grid
                item
                key={question.id}>
                <Paper
                  onClick={() => setCurrentQuestionIndex(index)}
                  style={{
                    fontSize: "6px",
                    width: "40px",
                    textAlign: "center",
                    backgroundColor: renderStatusIcon(status, question.id),
                    color: currentQuestionIndex === index ? "#fff" : "#000",
                  }}>
                  <IconButton color="primary">{index + 1}</IconButton>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" gutterBottom>{oppo}'s progress</Typography>
          <Grid container>
            {selectedQuestions?.map((question, index) => (
              <Paper
                onClick={() => setCurrentQuestionIndex(index)}
                style={{
                  fontSize: "6px",
                  width: "40px",
                  textAlign: "center",
                  marginRight : "15px",
                  backgroundColor: renderStatusIcon(oppStatus, question.id),
                  color: currentQuestionIndex === index ? "#fff" : "#000",
                }}>
                <IconButton color="primary">{index + 1}</IconButton>
              </Paper>
            ))}
          </Grid>
        </Box>

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
