require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/taskdb';

const app = express();

app.use(express.json());

connectDB(); //Connect to MongoDB

app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));