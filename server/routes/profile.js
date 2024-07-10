// routes/profile.js

import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';
import { getUserProfile } from '../controllers/profileController.js';

// Get user profile (authenticated route)
router.get('/', auth, getUserProfile);

export default router;
