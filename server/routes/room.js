import express from 'express';
import { createRoom, joinRoom, getRoomQuestions } from '../controllers/roomController.js';

const router = express.Router();

router.post('/', createRoom);
router.post('/:id/join', joinRoom);
router.get('/:id/questions', getRoomQuestions);

export default router;
