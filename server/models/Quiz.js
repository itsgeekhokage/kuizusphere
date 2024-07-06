import mongoose from 'mongoose';

const QuizSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctOption: { type: String, required: true },
});

export default mongoose.model('Quiz', QuizSchema);
