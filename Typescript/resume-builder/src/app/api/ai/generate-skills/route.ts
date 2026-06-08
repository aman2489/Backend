import { generateAiContent } from "@/lib/gemini";
import { GenerateSkillsBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateSkillsBody = await req.json();

    const { experienceLevel, jobTitle } = body;

    if (!experienceLevel || !jobTitle)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Missing fields",
        },
        { status: 400 },
      );

    const prompt = `
    You are an expert ATS resume analyzer and technical recruiter.

    Generate ATS-friendly technical skills for a resume based on the candidate details.

    Candidate Details:
    - Job Title: ${jobTitle}
    - Experience Level: ${experienceLevel}

    Rules:
    1. Return ONLY a valid JSON array of strings.
    2. Do not return plain text.
    3. Do not return comma-separated values.
    4. Do not include any object keys like "skills" or "data".
    5. Do not include explanations, headings, notes, or extra text.
    6. Do not wrap the response inside markdown code blocks.
    7. Do not use bullet points or numbering.
    8. Include ONLY technical skills:
    - Programming languages
    - Frameworks
    - Libraries
    - Databases
    - Developer tools
    - Cloud technologies
    - Technical concepts
    - Industry-specific technologies
    9. Exclude soft skills like:
    communication,
    teamwork,
    leadership,
    creativity,
    problem-solving.
    10. Match skills according to the provided job title.
    11. Adjust skill complexity according to the experience level.
    12. Include only relevant ATS keywords.
    13. Avoid duplicate skills.
    14. Generate between 15 and 25 skills.

    Response format example:
    [
    "JavaScript",
    "TypeScript",
    "React.js",
    "Node.js",
    "MongoDB"
    ]

    Generate the JSON array now.
    `;

    const result = await generateAiContent(prompt);

    if (!result) {
    return NextResponse.json<ApiResponse>(
        {
            success: false,
            message: "Failed to generate skills"
        },
        { status: 500 }
    );
}

    const skills = JSON.parse(result);

    return NextResponse.json<ApiResponse>({
        success: true,
        message: "skills created",
        data: skills
    }, { status: 201 });
  } catch (error) {
    console.log("Error in generate skills Api!");
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
