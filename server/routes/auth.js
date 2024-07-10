// routes/auth.js

import express from 'express';
const router = express.Router();
import { register, login } from '../controllers/authController.js';

// Register a user
router.post('/register', register);

// Login a user
router.post('/login', login);

export default router;
