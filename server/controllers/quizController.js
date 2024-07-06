import Quiz from '../models/Quiz.js';

export const createQuiz = async (req, res) => {
    const { questionText, options, correctOption } = req.body;
    try {
        const quiz = new Quiz({ questionText, options, correctOption });
        await quiz.save();
        res.status(201).json({ quiz });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
