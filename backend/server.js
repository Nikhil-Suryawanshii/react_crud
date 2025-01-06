const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://test:h29IfzxYr2U3ahaQ@cluster1997.3whof.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from Express');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
