const express = require("express");

const app = express();

app.use(express.json());

const notes = [
    {
        title: "test title 0",
        description: "test description 0"
    }
]


app.get("/", (req, res)  => {
    res.send("REST Api Demo");
})

app.get("/notes", (req, res) => {
    res.send({notes: notes});
});

app.post("/notes", (req, res) => {
    notes.push(req.body);
    res.status(201).json({"message": "note created successfully"});
});

app.delete("/notes/:index", (req, res) => {
    delete notes[req.params.index];
    res.status(204).json({"message": "note deleted successfully"});
});

app.patch("/notes/:index", (req, res) => {

    notes[req.params.index].description = req.body.description;
    res.status(200).json({"message": "note updated successfully"});
});

app.put("/notes/:index", (req, res) => {

    notes[req.params.index] = {
        title: req.body.title,
        description: req.body.description
    }

    res.status(200).json({"message": "note updated successfully"});

});


module.exports = app;