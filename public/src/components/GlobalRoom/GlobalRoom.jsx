/** @format */

import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
// import { useHistory } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Adjust the URL as necessary

const GlobalRoom = () => {
//   const history = useHistory();
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    socket.on("match", (data) => {
      setRoomId(data.roomId);
      history.push(`/room/${data.roomId}`);
    });

    socket.emit("joinGlobalRoom");

    return () => socket.off("match");
  }, [history]);

  return (
    <Container>
      <Box mt={8}>
        <Typography variant="h4">Global Room</Typography>
        <Typography variant="h6">Searching for an opponent...</Typography>
      </Box>
    </Container>
  );
};

export default GlobalRoom;
