const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

/* MongoDB Connection */
const mongodbUri = 'mongodb+srv://vasanthnachimuthu:vasanth1234@quiz-app.nag8b45.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongodbUri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('MongoDB connection error:', error);
    });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* Define Schema and Model */
const questionSchema = new mongoose.Schema({
    category: String,
    question: String,
    options: [String],
    correct_answer: String
});

const Question = mongoose.model('Question', questionSchema);

/* Example Route */
app.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/* Start Server */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
