/** @format */

import React, { useState } from "react";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { email, password });
      console.log(response.data);
      // Handle successful login (e.g., redirect to dashboard)
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
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary">
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
