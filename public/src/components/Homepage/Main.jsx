/** @format */

import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import FriendList from "./FriendList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  onMatchConfirm,
  onMatchDenied,
  onMatchReq,
  onOnlineUsers,
  sendMatchReq,
} from "../../socket";
import MatchReq from "./MatchReq";
import { createMatch } from "../../apis/match";

const Main = () => {
  const user = useSelector((state) => state.user?.user?.username);
  const navigate = useNavigate();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [requestMakerId, setRequestMakerId] = useState("");

  useEffect(() => {
    if (!user) navigate("login");

    onOnlineUsers((users) => setOnlineUsers(users));

    const handleMatchReq = (data) => {
      setOpenDialog(true);
      setRequestMakerId(data);
    };
    onMatchReq(handleMatchReq);

    const handleMatchConfirm = async (data) => {
      navigate("/quiz", { state: data });
    };

    const handleMatchDenied = () => {
      alert("Your match was denied, poor man...");
    };

    onMatchConfirm(handleMatchConfirm);
    onMatchDenied(handleMatchDenied);
  }, []);

   useEffect(()=>{
    if(onlineUsers.length == 0){
      onOnlineUsers((users) => setOnlineUsers(users));
    }
   }, [])

  const handleRandomMatch = () => {
    let n = onlineUsers.length;
    let x = Math.floor(Math.random() * (n));
    sendMatchReq(onlineUsers[x]);
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "100vw",
        alignItems: "center",
      }}>
      <Typography
        variant="h2"
        sx={{ color: "#f1c40f", width: "fit-content" }}>
        Welcome, {user}
      </Typography>
      <Typography
        variant="h5"
        gutterBottom>
        Ready for your practice today...
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
        onClick={handleRandomMatch}
        >
        Get Started
      </Button>

      <Box>
        <FriendList list={onlineUsers} />
        <MatchReq
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          id={requestMakerId}
        />
      </Box>
    </Box>
  );
};

export default Main;
