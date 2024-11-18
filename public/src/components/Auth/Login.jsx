/** @format */

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import { loginUser } from "../../socket";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUser } from "../../redux/user";
import { createUser, loginTheUser } from "../../apis/user";


const LoginForm = ({ onSubmit, formData, setFormData }) => (
  <Box
    mt={2}
    component="form"
    onSubmit={onSubmit}>
    <Typography
      variant="h6"
      align="center"
      gutterBottom>
      Login
    </Typography>
    <TextField
      label="Username"
      variant="outlined"
      fullWidth
      margin="normal"
      required
      value={formData.username}
      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
    />
    <TextField
      label="Password"
      type="password"
      variant="outlined"
      fullWidth
      margin="normal"
      required
      value={formData.password}
      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
    />
    <Button
      type="submit"
      variant="contained"
      color="primary"
      fullWidth
      style={{ marginTop: "16px" }}>
      Login
    </Button>
  </Box>
);

const RegisterForm = ({ onSubmit, formData, setFormData }) => (
  <Box
    mt={2}
    component="form"
    onSubmit={onSubmit}>
    <Typography
      variant="h6"
      align="center"
      gutterBottom>
      Register
    </Typography>
    <TextField
      label="Username"
      variant="outlined"
      fullWidth
      margin="normal"
      required
      value={formData.username}
      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
    />
    <TextField
      label="Email"
      type="email"
      variant="outlined"
      fullWidth
      margin="normal"
      required
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    />
    <TextField
      label="Password"
      type="password"
      variant="outlined"
      fullWidth
      margin="normal"
      required
      value={formData.password}
      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
    />
    <Button
      type="submit"
      variant="contained"
      color="primary"
      fullWidth
      style={{ marginTop: "16px" }}>
      Register
    </Button>
  </Box>
);

const Login = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);

    if (newIndex === 0) {
      setFormData({ username: "", email: "", password: "" });
    } else {
      setFormData({ username: "", email: "", password: "" });
    }
  };

const handleLoginSubmit = async (event) => {
  event.preventDefault();

  if (formData.username && formData.password) {
    try {
      const user = await loginTheUser(formData);
      if(user){
        dispatch(saveUser(formData));
        navigate("/");
        console.log("Login successful", user);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  } else {
    console.error("Username and password are required");
  }
};

const handleRegisterSubmit = async (event) => {
  event.preventDefault();

  if (formData.username && formData.password) {
    try {
      const newUser = await createUser(formData);
      const loggedInUser = await loginTheUser(formData);
      dispatch(saveUser(loggedInUser));
      navigate("/");
      console.log("Registration successful and logged in:", loggedInUser);
    } catch (error) {
      console.error("Registration or login failed:", error);
    }
  } else {
    console.error("Username and password are required");
  }
};

  return (
    <Box
      display="flex"
      alignItems="center"
      minHeight="100vh"
      minWidth="100vw"
      bgcolor="#f5f5f5"
      p={4}>
      <Box
        mb={2}
        position="fixed"
        top={"2rem"}>
        <img
          src="/src/assets/logokuizo.png"
          alt="Company Logo"
          style={{ width: "100px" }}
        />
      </Box>

      <Box
        flex={1}
        display="flex"
        width={"100vw"}
        justifyContent="center">
        <Paper
          elevation={3}
          style={{
            flex: "1",
            padding: "30px",
            maxWidth: "400px",
            width: "100%",
          }}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>

          {tabIndex === 0 ? (
            <LoginForm
              onSubmit={handleLoginSubmit}
              formData={formData}
              setFormData={setFormData}
            />
          ) : (
            <RegisterForm
              onSubmit={handleRegisterSubmit}
              formData={formData}
              setFormData={setFormData}
            />
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
