const express = require("express");
const noteModel = require("./models/notes.model");
const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Notes server with connection to mongoDB");
})

app.post("/notes", async (req, res) => {
    const { title, description} = req.body;
    const note = await noteModel.create({
        title,
        description
    })

    res.status(201).json({
        message: "Note created successfully",
        note
    })
})

app.get("/notes", async (req, res) => {
    const allNotes = await noteModel.find();
    
    res.status(200).json({
        message: "Notes fetched successfully",
        allNotes
    })
});

module.exports = app;