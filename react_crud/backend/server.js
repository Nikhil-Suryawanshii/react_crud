const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;
const CrudModel = require('./models/Crud'); // Import your model

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://test:h29IfzxYr2U3ahaQ@cluster1997.3whof.mongodb.net/crud', {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Route to get all entries
// app.get('/get', async (req, res) => {
//     try {
//         const data = await CrudModel.find();
//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// Route to add a new entry
app.post('/add', async (req, res) => {
    const newData = new CrudModel({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        dob: req.body.dob,
        profilePhoto: req.body.profilePhoto, // Assuming this is a URL or file path
    });
    try {
        const savedData = await newData.save();
        res.status(201).json(savedData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to update an entry by ID
// app.put('/update/:id', async (req, res) => {
//     try {
//         const updatedData = await CrudModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(updatedData);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// // Route to delete an entry by ID
// app.delete('/delete/:id', async (req, res) => {
//     try {
//         await CrudModel.findByIdAndDelete(req.params.id);
//         res.sendStatus(204);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});