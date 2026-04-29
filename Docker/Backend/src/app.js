import express from 'express';

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.get("/api/data", (req, res) => {
    const data = {
        id: 1,
        name: "sample data",
        description: "This is a sample data from the API"
    };
    res.status(200).json(data);
});


export default app;