const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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

app.use(cors());

const questionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    correct_answer: String
});

const Question = mongoose.model('Question', questionSchema);

// GET  fetch a single question by ID
app.get('/api/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
