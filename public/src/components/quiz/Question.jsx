/** @format */

import React from "react";
import {
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

const Question = ({ question, options, selectedOption, handleChange }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h6"
        gutterBottom>
        {question}
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          value={selectedOption}
          onChange={handleChange}>
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default Question;
