/** @format */

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Search } from "@mui/icons-material";

const Challenge = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [challenges, setChallenges] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Michael Johnson" },
    { id: 4, name: "Emily Brown" },
    { id: 5, name: "David Wilson" },
  ]);
  const [filteredChallenges, setFilteredChallenges] = useState(challenges);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredChallenges(
      challenges.filter((challenge) =>
        challenge.name.toLowerCase().includes(value)
      )
    );
  };

  const handleChallengeFriend = (friendName) => {
    alert(`Challenging ${friendName}...`);
  };

  const handleRandomUser = () => {
    alert("Searching for a random user...");
  };

  return (
    <Box sx={{ margin: "0 auto", paddingTop: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}>
        <TextField
          variant="outlined"
          label="Search Friends"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ flex: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleRandomUser}
          sx={{ ml: 2 }}>
          <Search/>
        </Button>
      </Box>
      <Typography
        variant="h6"
        sx={{ mb: 1 }}>
        Challenges
      </Typography>
      <List sx={{ width: "100%", bgcolor: theme.palette.background.paper }}>
        {filteredChallenges.map((challenge) => (
          <ListItem
            key={challenge.id}
            button
            onClick={() => handleChallengeFriend(challenge.name)}>
            <ListItemAvatar>
              <Avatar sx={{bgcolor : theme.palette.primary.main}}>{challenge.name.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={challenge.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Challenge;
