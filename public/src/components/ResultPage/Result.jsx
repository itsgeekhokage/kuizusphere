/** @format */

import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import CelebrationIcon from "@mui/icons-material/Celebration";
import StarIcon from "@mui/icons-material/Star";
import { getMatch } from "../../apis/match";
import { useLocation } from "react-router-dom";

const ResultPage = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [winner, setWinner] = useState(null);
  const [matchId, setMatchId] = useState("");
  const [isDraw, setIsDraw] = useState(false);
  const location = useLocation();

  const fetchMatchData = async () => {
    try {
      const matchData = await getMatch(matchId);

      if (!matchData || !matchData.players || !matchData.scores) {
        throw new Error("Match data or scores are missing.");
      }

      setPlayers(Object.keys(matchData.scores));

      let scores = Object.values(matchData.scores);

      console.log("score" + scores);

      if(scores[0] == null || scores[1] == null) setLoading(true);
      else if(scores[0] == scores[1]) setIsDraw(true);
      else if(scores[0] > scores[1]) setWinner(players[0]);
      else setWinner(players[1]);
    } catch (error) {
      console.error("Error fetching match data:", error);
    }
  };

  useEffect(() => {
    fetchMatchData();
    const interval = setInterval(fetchMatchData, 2000);
    return () => clearInterval(interval);
  }, [matchId]);

  useEffect(() => {
    if (location?.state) {
      console.log(location.state);
      setMatchId(location.state);
    }
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{ textAlign: "center", mt: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 2 }}>
        Game Results
      </Typography>

      <CelebrationIcon
        color="primary"
        sx={{ fontSize: 60, mb: 2 }}
      />

      <Grid
        container
        spacing={4}
        justifyContent="center">
        {players.map((player, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                backgroundColor:
                  winner && player === winner
                    ? "lightgreen"
                    : isDraw
                    ? "lightyellow"
                    : "lightgray",
              }}>
              <Typography
                variant="h5"
                sx={{ mb: 1 }}>
                {player}
              </Typography>
              <Typography
                variant="h3"
                color="secondary">
                {player.score !== null ? player.score : "Waiting..."}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          mt: 4,
          p: 3,
          backgroundColor: "gold",
          borderRadius: 2,
          display: "inline-block",
        }}>
        {loading ? (
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold" }}>
            <CircularProgress size={20} /> Waiting for both players to submit
            scores...
          </Typography>
        ) : isDraw ? (
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold" }}>
            <StarIcon fontSize="small" /> It's a Draw!{" "}
            <StarIcon fontSize="small" />
          </Typography>
        ) : (
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold" }}>
            <StarIcon fontSize="small" /> {winner} is the Winner!{" "}
            <StarIcon fontSize="small" />
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ResultPage;
