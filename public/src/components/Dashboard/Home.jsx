/** @format */

import React from "react";
import { Container, Typography, Button, Box, IconButton } from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleCreateRoom = () => {
    navigate("/create-room");
  };

  const handleJoinRoom = () => {
    navigate("/join-room");
  };

  const handleGlobalRoom = () => {
    navigate("/global-room");
  };

  return (
    <Container sx={{width : "100vw"}}>
      <Box sx={{display : "flex", justifyContent : "space-between"}}>
        <Typography
          variant="h4"
          gutterBottom>
          Dashboard
        </Typography>
        <Box> <IconButton> <AccountCircle fontSize="2rem" />  </IconButton> </Box>
      </Box>
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
          color="info"
          fullWidth
          onClick={handleGlobalRoom}>
          Global Room
        </Button>
    </Container>
  );
};

export default Home;
