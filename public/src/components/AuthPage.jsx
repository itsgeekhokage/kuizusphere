/** @format */
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Box,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email : "",
    password : "",
  })
  // Handle form switch
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  // Common Form Fields (Email & Password)
  const renderCommonFields = () => (
    <>
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        margin="normal"
        required
        value={userData.email}
        onChange={(e) => setUserData({...userData, email : e.target.value})}
        />
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        margin="normal"
        value={userData.password}
        onChange={(e) => setUserData({...userData, password : e.target.value})}
        required
      />
    </>
  );

  // Register-specific Fields
  const renderRegisterFields = () => (
    <TextField
      fullWidth
      label="Username"
      variant="outlined"
      margin="normal"
      required
    />
  );

  // Form Submit (Dummy Handler)
  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("kuizouser", JSON.stringify(userData));

    if (isLogin) {
      navigate("/");
    } else {
    }
  };

  return (
    <Container
      maxWidth="xs"
      component={Paper}
      style={{ padding: "20px" }}>
      <Box
        textAlign="center"
        mb={2}>
        <Typography variant="h5">{isLogin ? "Login" : "Register"}</Typography>
      </Box>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}>
          <Grid
            item
            xs={12}>
            {/* Show additional username field for registration */}
            {!isLogin && renderRegisterFields()}

            {/* Common fields for both forms */}
            {renderCommonFields()}
          </Grid>

          <Grid
            item
            xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              size="large">
              {isLogin ? "Login" : "Register"}
            </Button>
          </Grid>

          <Grid
            item
            xs={12}>
            <Box
              textAlign="center"
              mt={2}>
              <Typography variant="body2">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <Link
                  href="#"
                  onClick={toggleForm}>
                  {isLogin ? "Register here" : "Login here"}
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
