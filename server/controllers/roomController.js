import Room from '../models/Room.js';
import Quiz from '../models/Quiz.js';

export const createRoom = async (req, res) => {
    const { name } = req.body;
    try {
        const room = new Room({ name });
        await room.save();
        res.status(201).json({ room });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const joinRoom = async (req, res) => {
    const { id } = req.params;
    try {
        const room = await Room.findById(id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        room.users.push(req.user.id);
        await room.save();
        res.status(200).json({ message: 'Joined room successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getRoomQuestions = async (req, res) => {
    const { id } = req.params;
    try {
        const questions = await Quiz.find({ roomId: id });
        res.status(200).json(questions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
