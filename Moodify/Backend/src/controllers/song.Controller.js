const songModel = require("../models/song.model");
const id3 = require("node-id3");
const {uploadFile} = require("../services/storage.service");


async function uploadSong(req, res) {

    const songBuffer = req.file.buffer;

    const {mood} = req.body;

    console.log(songBuffer, mood);

    const tags = id3.read(songBuffer);
    
    const [songFile, posterFile] = await Promise.all([
        uploadFile({
            buffer: songBuffer,
            filename: tags.title + ".mp3",
            folder: "chohot-2/moodify/songs"
        }),
        uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + ".jpeg",
            folder: "chohot-2/moodify/posters"
        })
    ]);

    const song = await songModel.create({
        title: tags.title,
        url: songFile.url,
        posterUrl: posterFile.url,
        mood
    })

    return res.status(201).json({
        message: "Song created successfully",
        song
    })
}

async function getSong(req, res) {
    const {mood} = req.query;

    const song = await songModel.findOne({mood});

    if(!song) {
        return res.status(404).json({message: "No song found!!"});
    }
    
    return res.status(200).json({
        message: "Song fetched successfuly.",
        song
    })
}

module.exports = {uploadSong, getSong}