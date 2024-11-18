import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    players: [
        { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
    ],
    scores: {
        type: Map,
        of: Number,
        default: {}
    }
}, { timestamps: true });

export const Match = mongoose.model('Match', matchSchema);
