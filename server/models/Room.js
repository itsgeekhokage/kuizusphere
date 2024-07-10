// models/Room.js

import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Room', RoomSchema);
