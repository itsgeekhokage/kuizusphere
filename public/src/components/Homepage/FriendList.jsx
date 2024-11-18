/** @format */

import { Avatar, Box, Paper, Typography } from "@mui/material";
import React from "react";
import { sendMatchReq } from "../../socket";

const FriendList = ({ list }) => {
  list = list.map(item => {
    return {name : item, isOnline : true}
  })
  return (
    <Box>
      {list.map((item, index) => (
        <Paper
          key={index}
          onClick={() => sendMatchReq(item.name)}
          style={{
            display: "flex",
            alignItems: "center",
            cursor : "pointer",
            padding: "10px",
            margin: "5px 0",
          }}>
          <Avatar
            src={item.avatar}
            alt={item.name}
            style={{ marginRight: "10px" }}
          />
          <Box>
            <Typography variant="body1">{item.name}</Typography>
            <Typography
              variant="body2"
              color={item.isOnline ? "green" : "gray"}>
              {item.isOnline ? "Online" : "Offline"}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default FriendList;
