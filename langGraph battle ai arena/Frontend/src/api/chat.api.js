import axios from "axios";

export const chatResponse = async (userInput) => {
    const mockData = {
        solution_1: `Here is a modern solution using standard methodologies:\n\n\`\`\`javascript\n// Solution 1 - Modern Approach\nconst solve = (input) => {\n  console.log("Analyzing: ", input);\n  return input.split('').reverse().join('');\n};\n\`\`\`\n\nThis method is highly readable, leveraging built-in features for optimal maintainability.`,
        solution_2: `An alternative approach, optimizing for minimal overhead in iterative setups:\n\n\`\`\`javascript\n// Solution 2 - Iterative Approach\nfunction solve(input) {\n  let reversed = '';\n  for(let i = input.length - 1; i >= 0; i--) {\n    reversed += input[i];\n  }\n  return reversed;\n}\n\`\`\`\n\nThis method avoids allocating intermediary arrays, directly building the result string.`,
        judge: {
            solution_1_score: 9,
            solution_2_score: 7,
            solution_1_reasoning: "Excellent readability and idiomatic approach. Relying on built-ins usually offers robust performance thanks to optimized under-the-hood engine implementations.",
            solution_2_reasoning: "Good memory footprint by eliminating array allocations, however string concatenation in a loop can be suboptimal depending on the JavaScript engine. Less idiomatic."
        }
    };

    try {
        // Uncomment to use real API endpoint
        // const response = await axios.post("http://localhost:3000/use-graph", { problem: userInput });
        // return response.data;
        
        return new Promise((resolve) => setTimeout(() => resolve(mockData), 2000));
    } catch (error) {
        console.error("API error, falling back to mock data:", error);
        return mockData;
    }
};