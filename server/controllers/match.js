import { Match } from '../modal/match.js';
import { User } from "../modal/user.js";

export const createMatch = async (req, res) => {
    const { player1id, player2id } = req.body;

    try {
        const player1 = await User.findOne({ username: player1id });
        const player2 = await User.findOne({ username: player2id });

        if (!player1 || !player2) {
            return res.status(404).json({ message: 'One or both players not found' });
        }

        const scores = new Map();
        scores.set(player1.username, null);
        scores.set(player2.username, null);

        const match = new Match({
            players: [player1._id, player2._id],
            scores,
        });

        await match.save();
        res.status(201).json({ message: 'Match created successfully', match : match._id} );
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getMatch = async (req, res) => {
    const { id } = req.params;
    try {
        const match = await Match.findById(id)

        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }

        res.status(200).json(match);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


export const updateMatchScores = async (req, res) => {
    const { player, score } = req.body;

    try {
        const match = await Match.findById(req.params.id).populate({ path: 'players', select: 'username' });
        if (!match) return res.status(404).json({ message: 'Match not found' });

        if (match.scores.has(player)) {
            match.scores.set(player, score);
        } else {
            return res.status(400).json({ message: `Player ${player} not found in this match` });
        }

        await match.save();
        res.status(200).json({ message: 'Scores updated successfully', match });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getAllMatches = async (req, res) => {
    try {
        const matches = await Match.find().populate({ path: 'players', select: 'username' });
        res.status(200).json(matches);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
