/** @format */

import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/rooms", { name: roomName });
      console.log(response.data);
      navigate(`/room/${response.data.room._id}`);
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
          Create Room
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary">
            Create
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateRoom;
