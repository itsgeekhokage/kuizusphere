// models/Question.js

import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    correctAnswer: {
        type: String,
        required: true
    }
});

export default mongoose.model('Question', QuestionSchema);
