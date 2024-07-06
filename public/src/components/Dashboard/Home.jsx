/** @format */

import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
// import { useHistory } from "react-router-dom";

const Home = () => {
//   const history = useHistory();

  const handleCreateRoom = () => {
    history.push("/create-room");
  };

  const handleJoinRoom = () => {
    history.push("/join-room");
  };

  const handleGlobalRoom = () => {
    history.push("/global-room");
  };

  return (
    <Container>
      <Box mt={8}>
        <Typography
          variant="h4"
          gutterBottom>
          Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCreateRoom}
          sx={{ mb: 2 }}>
          Create Room
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleJoinRoom}
          sx={{ mb: 2 }}>
          Join Room
        </Button>
        <Button
          variant="contained"
          color="default"
          fullWidth
          onClick={handleGlobalRoom}>
          Global Room
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
