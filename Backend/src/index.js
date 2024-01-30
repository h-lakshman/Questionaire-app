require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const formsRoutes = require('./routes/forms');
const authenticateToken = require('./middleware/auth');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/forms', authenticateToken, formsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
