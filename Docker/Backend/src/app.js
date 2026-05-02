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

app.get("/api/users", (req, res) => {
    const users = [
        {id: 1, name: "Alice"},
        {id: 2, name: "Bob"},
        {id: 3, name: "Charlie"}
    ]
    res.status(200).json(users);
})


export default app;