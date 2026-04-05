import express from 'express';
import runGraph from "./ai/graph.ai.js"

const app = express();


app.post("/use-graph", async (req, res) => {
    const result = await runGraph("Write an code for factorila function in js");
    res.json(result);
});


export default app;