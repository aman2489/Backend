import express from 'express';
import runGraph from "./ai/graph.ai.js"
import { success } from 'zod';
import cors from "cors";
const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}))

app.get("/", (req, res) => {
    res.send("Hello from AI battle arena server!");
})

app.post("/use-graph", async (req, res) => {
    const {input} = req.body;

    const result = await runGraph(input);

    res.status(200).json({
        message: "Graph executed successfully",
        result,
        success: true
    })
});


export default app;