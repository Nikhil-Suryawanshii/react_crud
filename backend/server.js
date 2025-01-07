const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = 5000;
const TodoModel = require('./models/Todo')

// Middleware
app.use(cors())
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://test:h29IfzxYr2U3ahaQ@cluster1997.3whof.mongodb.net/test', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Basic route to add a todo
app.post('/add', (req, res) => {
  const task = req.body.task;
  TodoModel.create({
    task: task
  }).then(result => res.json(result))
   .catch(err => res.json(err))
});

// Route to get all todos
app.get('/get', (req, res) => {
   TodoModel.find()
   .then(result => res.json(result))
   .catch(err => res.json(err))
});

// Route to update a todo by ID
app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  TodoModel.findByIdAndUpdate(id, { task: task }, { new: true })
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ message: 'Todo not found' });
      }
    })
    .catch(err => res.status(500).json(err));
});

// Route to delete a todo by ID
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete(id)
    .then(result => {
      if (result) {
        res.json({ message: 'Todo deleted successfully' });
      } else {
        res.status(404).json({ message: 'Todo not found' });
      }
    })
    .catch(err => res.status(500).json(err));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
