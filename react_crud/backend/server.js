const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = 5000;
const CrudModel = require('./models/Crud')

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://test:h29IfzxYr2U3ahaQ@cluster1997.3whof.mongodb.net/crud', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
  
  

// app.get('/get', async (req, res) => {
//   const todos = await Todo.find();
//   res.json(todos);
// });

// app.post('/add', async (req, res) => {
//   const todo = new Todo({
//     task: req.body.task,
//   });
//   await todo.save();
//   res.json(todo);
// });

// app.delete('/delete/:id', async (req, res) => {
//   await Todo.findByIdAndDelete(req.params.id);
//   res.sendStatus(204);
// });

// app.put('/update/:id', async (req, res) => {
//   const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(todo);
// });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
