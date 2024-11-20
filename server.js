const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/testimonial', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const feedbackSchema = new mongoose.Schema({
    name: String,
    feedback: String,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Endpoint to submit feedback
app.post('/feedback', async (req, res) => {
    const { name, feedback } = req.body;
    const newFeedback = new Feedback({ name, feedback });
    await newFeedback.save();
    res.json(newFeedback);
});

// Endpoint to get all feedbacks
app.get('/feedbacks', async (req, res) => {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
});

app.listen(5010, () => {
    console.log('Server is running on port 5010');
});
