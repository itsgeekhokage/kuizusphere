// controllers/roomController.js

import Room from '../models/Room.js';
import User from '../models/User.js';

// Create a new room
export const createRoom = async (req, res) => {
    const { name } = req.body;

    try {
        const newRoom = new Room({
            name,
            creator: req.user.id, // logged in user
            members: [req.user.id] // add creator as member
        });

        const room = await newRoom.save();
        res.json(room);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get all rooms
export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find().populate('creator', 'username');
        res.json(rooms);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
