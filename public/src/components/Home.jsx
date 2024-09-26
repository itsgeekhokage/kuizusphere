/** @format */

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  Dialog,
  CircularProgress,
  DialogContent,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

// Styled Components
const HeroSection = styled("div")({
  backgroundImage: 'url("/your-background-image.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: "100px 0",
  textAlign: "center",
  color: "#333333",
});

const FeatureCard = styled(Card)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(4),
  margin: theme.spacing(2),
}));

const Footer = styled("footer")({
  backgroundColor: "#3498db",
  color: "#fff",
  padding: "20px 0",
  textAlign: "center",
});

export default function Home() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    navigate("quiz");
  };

  const startQuiz = (numQuestions) => {
    const user = sessionStorage.getItem("kuizouser");
    if(user){
      const selectedQuestions = questions.slice(0, numQuestions);
      navigate("/quiz", { state: { selectedQuestions } });
    }
    else {
      navigate("/login");
    }
  };

  const questions = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    question: `Question ${index + 1}: What is ${index + 1} + ${index + 1}?`,
    options: [`${index}`, `${index + 1}`, `${index + 2}`, `${index + 3}`],
    correctAnswer: `${index + 2}`,
  }));

  const handleCloseLoader = () => {
    setLoading(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            style={{ flexGrow: 1 }}>
            Your App
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Features</Button>
          <Button color="inherit">Contact</Button>
        </Toolbar>
      </AppBar>

      <HeroSection>
        <Typography
          variant="h2"
          style={{ color: "#f1c40f" }}>
          Welcome, GeekNoober
        </Typography>
        <Typography
          variant="h5"
          gutterBottom>
          Ready for your practise today...
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ marginTop: "20px" }}>
          Get Started
        </Button>
      </HeroSection>

      <Container
        maxWidth="lg"
        style={{ padding: "40px 0" }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom>
          Rapid Challenges
        </Typography>
        <Grid
          container
          spacing={3}>
          {[5, 10, 15, 20].map((num) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={num}>
              <FeatureCard>
                <Typography variant="h5">{num} Questions</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => startQuiz(num)}
                  style={{ marginTop: "20px" }}>
                  Start
                </Button>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* What's New Section */}
      <Container
        maxWidth="lg"
        style={{ padding: "40px 0", backgroundColor: "#f9f9f9" }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom>
          Challenge your friends, it's fun 😉...
        </Typography>
        <Grid
          container
          spacing={3}>
          <Grid
            item
            xs={12}
            sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Custom Questions</Typography>
                <Typography variant="body2">Need Subscription...</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Random DSA Questions</Typography>
                <Typography variant="body2">Click to play...</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Box
        textAlign="center"
        py={5}>
        <Typography
          variant="h5"
          gutterBottom>
          Join our community today and start exploring
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large">
          Sign Up Now
        </Button>
      </Box>

      <Footer>
        <Typography variant="body2">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
        <Typography variant="body2">
          Email: contact@yourcompany.com | Phone: +1234567890
        </Typography>
        <Box>
          <Button color="inherit">Twitter</Button>
          <Button color="inherit">Facebook</Button>
          <Button color="inherit">LinkedIn</Button>
        </Box>
      </Footer>

      <Dialog open={loading}>
        <DialogContent style={{ textAlign: "center", padding: "20px" }}>
          <CircularProgress />
          <Typography
            variant="body1"
            style={{ marginTop: "20px" }}>
            Loading, please wait...
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}


