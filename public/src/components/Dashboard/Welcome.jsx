/** @format */

import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url(https://source.unsplash.com/random/1600x900?quiz)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: "center",
        position: "relative",
      }}>
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />
      <Box
        sx={{
            minHeight : "100vh",
            minWidth : "100vw",
          color: "#fff",
        }}>
        <Container>
          <Typography
            variant="h2"
            gutterBottom>
            Welcome to Kuizu!
          </Typography>
          <Typography
            variant="h5"
            gutterBottom>
            Join our quiz community and test your knowledge!
          </Typography>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="primary"
            sx={{ mt: 2, mx: 1 }}>
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            variant="outlined"
            color="secondary"
            sx={{ mt: 2, mx: 1 }}>
            Register
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Welcome;
