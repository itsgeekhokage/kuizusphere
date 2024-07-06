/** @format */

import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import axios from "axios";
// import { useHistory } from "react-router-dom";

const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
//   const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/rooms/${roomId}/join`);
      console.log(response.data);
      history.push(`/room/${roomId}`);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs">
      <Box mt={8}>
        <Typography
          component="h1"
          variant="h5">
          Join Room
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary">
            Join
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default JoinRoom;
