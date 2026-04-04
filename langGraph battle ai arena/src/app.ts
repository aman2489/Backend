import express from 'express';
import useGraph from "./services/graph.ai.service.js"
import { cohereModel, mistralModel } from './services/models.service.js';
import morgan from "morgan";
const app = express();

app.use(morgan("dev"));

app.post("/use-graph", async (req, res) => {
    const result = await useGraph("What is the capital of France?")

    return res.status(200).json({
        result
    })

});

// function testMistral(){
//     mistralModel.invoke("What is the capital of France?").then((response) => {
//         console.log("Mistral response:", response.text);
//     }).catch((error) => {        console.error("Error invoking Mistral model:", error);
//     });
// }
//testMistral();

// function testCohere(){
//     cohereModel.invoke("What is the capital of France?").then((response) => {
//         console.log("Cohere response:", response.text);
//     }).catch((error) => {        console.error("Error invoking Cohere model:", error);
//     });
// }
// testCohere();

export default app;