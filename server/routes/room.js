// routes/rooms.js

import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';
import { createRoom, getRooms } from '../controllers/roomController.js';

// Create a new room (authenticated route)
router.post('/', auth, createRoom);

// Get all rooms
router.get('/', getRooms);

export default router;
