const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
const mongodbUri = 'mongodb+srv://vasanthnachimuthu:vasanth1234@quiz-app.nag8b45.mongodb.net/Test?retryWrites=true&w=majority';
mongoose.connect(mongodbUri);

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Schema definition
const questionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    correct_answer: String
});

const Question = mongoose.model('Question', questionSchema);

// GET endpoint to fetch a single question by ID
app.get('/api/questions/:id', async (req, res) => {
    const questionId = req.params.id;

    try {
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
