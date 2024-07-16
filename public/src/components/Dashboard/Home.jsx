/** @format */

import React from "react";
import { Container, Typography, Button, Box, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AllRooms from "./AllRooms";
import RightBar from "./RightBar";
import Challenge from "./Challenge";

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
    <Container sx={{ width: "100vw", bgcolor: "background.default" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "background.paper",
          padding: 2,
          borderRadius: 1,
        }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "text.heading" }}>
          KuizoSphere
        </Typography>
        <IconButton>
          <AccountCircle sx={{ fontSize: "2rem", color: "primary.main" }} />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "4vw",
        }}>
        {/* <AllRooms /> */}
        <Box sx={{display : "flex", flexDirection : "column", width : "30vw", gap : "4vw" }}>
          <RightBar />
          <Challenge />
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
