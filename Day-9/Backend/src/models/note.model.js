const mongoose = require("mongoose");

const noteSechema = new mongoose.Schema({
    title: String,
    description: String
});

const noteModel = mongoose.model("notes", noteSechema);

module.exports = noteModel;