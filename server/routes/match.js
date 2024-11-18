import express from 'express';
import {
    createMatch,
    getMatch,
    updateMatchScores,
    getAllMatches
} from './../controllers/match.js';

const router = express.Router();

router.post('/', createMatch);
router.get('/byid/:id', getMatch);
router.put('/:id/scores', updateMatchScores);
router.get('/', getAllMatches);

export default router;
