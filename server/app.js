const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { dbConnect } = require('./dbController/dbConnect');
const List = require('./dbController/list.models');
const cors = require('cors');

const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

dbConnect();

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/showList', async (req, res) => {
    try {
        const list = await List.find({});
        res.send(list);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post('/addTask', async (req, res) => {
    try {
        const { task, description } = req.body;
        const list = await List.create({ task, description });
        res.status(200).json({ message: "Task Added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.put('/updateList/:id', async (req, res) => {
    try {
        const Id = req.params.id;
        const updatedTask = await List.updateOne({ _id: Id }, { task: "sell a pen" });
        console.log(updatedTask, "Updated Task");
        res.status(200).json({ message: "Task Updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.delete('/deleteTask/:id', async (req, res) => {
    try {
        const Id = req.params.id;
        const deletedTask = await List.deleteOne({ _id: Id });
        console.log(deletedTask, "Deleted Task");
        res.status(200).json({ message: "Task Deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(port, () => console.log("Server Created"));
