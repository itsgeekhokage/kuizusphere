import express from 'express';
import {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    loginUser
} from '../controllers/user.js';

const router = express.Router();

router.post('/', createUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);

export default router;
