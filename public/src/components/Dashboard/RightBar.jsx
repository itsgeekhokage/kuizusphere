/** @format */

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const RightBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.paper,
        padding: 2,
        borderRadius: 2,
        textAlign: "center",
      }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: theme.palette.text.primary }}>
        Quick Matches
      </Typography>
      <Typography
        variant="body2"
        sx={{ marginTop: 2, color: theme.palette.text.secondary }}>
        Compete with peers of similar skill levels
      </Typography>
      <Box sx={{display : "flex", justifyContent : "space-between"}}>
        <Button
          variant="contained"
          color="primary"
          sx={{ margin: 1, width: "100%" }} onClick={() => navigate("/quiz-room")}>
          5 Q
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ margin: 1, width: "100%" }}>
          10 Q
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ margin: 1, width: "100%" }}>
          20 Q
        </Button>
      </Box>
    </Box>
  );
};

export default RightBar;
