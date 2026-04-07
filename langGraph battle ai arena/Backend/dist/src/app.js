import express from 'express';
import runGraph from "./ai/graph.ai.js";
import { success } from 'zod';
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}));
app.post("/use-graph", async (req, res) => {
    const { input } = req.body;
    const result = await runGraph(input);
    res.status(200).json({
        message: "Graph executed successfully",
        result,
        success: true
    });
});
// app.get("/", (req, res) => {
//     res.send("Hello from AI battle arena server!");
// })
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../../public")));
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});
export default app;
//# sourceMappingURL=app.js.map