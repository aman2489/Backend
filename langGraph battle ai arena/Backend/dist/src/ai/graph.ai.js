import { StateGraph, StateSchema, START, END } from "@langchain/langgraph";
import z from "zod";
import { mistralAIModel, geminiModel, cohereModel } from "./model.ai.js";
import { createAgent, HumanMessage, providerStrategy } from "langchain";
const state = new StateSchema({
    problem: z.string().default(""),
    solution_1: z.string().default(""),
    solution_2: z.string().default(""),
    judge: z.object({
        solution_1_score: z.number().default(0),
        solution_2_score: z.number().default(0),
        solution_1_reasoning: z.string().default(""),
        solution_2_reasoning: z.string().default("")
    })
});
const solutionNode = async (state) => {
    const [mistralSolution, cohereSolution] = await Promise.all([
        mistralAIModel.invoke(state.problem),
        cohereModel.invoke(state.problem)
    ]);
    return {
        solution_1: mistralSolution.text,
        solution_2: cohereSolution.text
    };
};
const judgeNode = async (state) => {
    const { solution_1, solution_2 } = state;
    const judge = createAgent({
        model: geminiModel,
        responseFormat: providerStrategy(z.object({
            solution_1_score: z.number().min(0).max(10),
            solution_2_score: z.number().min(0).max(10),
            solution_1_reasoning: z.string().default(""),
            solution_2_reasoning: z.string().default("")
        })),
        systemPrompt: `You are a judge tasked with evaluating two solutions to a problem. The problem is: ${state.problem}. The first solution is: ${solution_1}. The second solution is: ${solution_2}. Please provide a score between 0 and 10 for each solution, where 0 means the solution is completely incorrect or irrelevant, and 10 means the solution is perfect and fully addresses the problem. Also provide a brief reasoning for the score you assigned to each solution.`
    });
    const judgeResponse = await judge.invoke({
        messages: [
            new HumanMessage(`
                Problem: ${state.problem}
                Solution 1: ${solution_1}
                Solution 2: ${solution_2}
                Please evaluate the solutions and provide scores and reasoning
                `)
        ]
    });
    const { solution_1_score, solution_2_score, solution_1_reasoning, solution_2_reasoning } = judgeResponse.structuredResponse;
    return {
        judge: {
            solution_1_score,
            solution_2_score,
            solution_1_reasoning,
            solution_2_reasoning
        }
    };
};
const graph = new StateGraph(state)
    .addNode("solutionNode", solutionNode)
    .addNode("judgeNode", judgeNode)
    .addEdge(START, "solutionNode")
    .addEdge("solutionNode", "judgeNode")
    .addEdge("judgeNode", END)
    .compile();
export default async function (problem) {
    const result = await graph.invoke({
        problem: problem
    });
    return result;
}
//# sourceMappingURL=graph.ai.js.map