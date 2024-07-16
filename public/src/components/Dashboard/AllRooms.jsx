/** @format */

import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  CardHeader,
  Avatar,
  Tooltip,
  TextField,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const AllRooms = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [rooms, setRooms] = useState([
    { id: 1, name: "Room 1", rank: 1, rating: 454 },
    { id: 2, name: "Room 2", rank: 2, rating: 429 },
    { id: 3, name: "Room 3", rank: 3, rating: 576 },
    { id: 4, name: "Room 4", rank: 4, rating: 600 },
    { id: 5, name: "Room 5", rank: 5, rating: 500 },
  ]);
  const [filteredRooms, setFilteredRooms] = useState(rooms);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredRooms(
      rooms.filter((room) => room.name.toLowerCase().includes(value))
    );
  };

  const handleCreateRoom = () => {
    const newRoomName = prompt("Enter the new room name:");
    if (newRoomName) {
      const newRoom = {
        id: rooms.length + 1,
        name: newRoomName,
        rank: rooms.length + 1,
        rating: Math.floor(Math.random() * 1000),
      };
      setRooms([...rooms, newRoom]);
      setFilteredRooms([...rooms, newRoom]);
    }
  };

  return (
    <Box sx={{ width: "50%", margin: "0 auto", paddingTop: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}>
        <TextField
          variant="outlined"
          label="Search Rooms"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ flex: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateRoom}
          sx={{ ml: 2 }}>
          new
        </Button>
      </Box>
      <Grid
        container
        spacing={2}>
        {filteredRooms.map((room) => (
          <Grid
            item
            xs={12}
            key={room.id}>
            <Card
              sx={{ borderRadius: 2, bgcolor: theme.palette.background.paper }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                    {room.name.charAt(0)}
                  </Avatar>
                }
                title={
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ color: theme.palette.text.primary }}>
                      {room.name}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Tooltip
                        title={`Rank: ${room.rank}`}
                        arrow>
                        <Typography
                          variant="body2"
                          sx={{
                            mr: 1,
                            cursor: "pointer",
                            color: theme.palette.text.secondary,
                          }}>
                          {room.rank}
                        </Typography>
                      </Tooltip>
                      |
                      <Tooltip
                        title={`Rating: ${room.rating}`}
                        arrow>
                        <Typography
                          variant="body2"
                          sx={{
                            ml: 1,
                            cursor: "pointer",
                            color: theme.palette.text.secondary,
                          }}>
                          {room.rating}
                        </Typography>
                      </Tooltip>
                    </Box>
                  </Box>
                }
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllRooms;
