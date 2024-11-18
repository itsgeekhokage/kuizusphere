/** @format */

import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sendMatchConfirm, sendMatchDenied } from "../../socket";
import { useSelector } from "react-redux";
import { createMatch } from "../../apis/match";

const MatchReq = ({openDialog, setOpenDialog, id}) => {
  const user = useSelector((state) => state.user?.user?.username);

  const navigate = useNavigate();
  const closeDialog = () => {
    sendMatchDenied(id);
    setOpenDialog(false);
  }

  const handleButtonClick = async () => {
    try {
        const response = await createMatch({
          player1id: id,
          player2id: user,
        });

        if (response) {
          sendMatchConfirm({ toUserId: id, client: user, match : response?.match });
          navigate("/quiz", { state: {client : id, match : response?.match} });
          closeDialog();
        } else {
          alert(response.message || "Could not create match");
        }
      } catch (error) {
        alert(error.message || "An error occurred while creating the match");
      }
  };

  return (
    <div>

      <Dialog
        open={openDialog}
        onClose={closeDialog}>
        <DialogTitle>Action Required</DialogTitle>
        <DialogContent>
          {id} wants to compete with you, want to proceed ?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleButtonClick}
            color="primary">
            Confirm
          </Button>
          <Button
            onClick={closeDialog}
            color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MatchReq;
