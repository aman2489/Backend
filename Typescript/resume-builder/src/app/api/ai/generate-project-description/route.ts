import { generateAiContent } from "@/lib/gemini";
import { GenerateProjectDescriptionBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateProjectDescriptionBody = await req.json();

    const { experienceLevel, jobTitle, techStack } = body;

    if (!experienceLevel || !jobTitle || !techStack)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Missing fields",
        },
        { status: 400 },
      );

    const prompt = `
    You are an expert ATS resume writer and senior software developer.

    Generate a professional ATS-friendly project description for a resume based on the candidate details.

    Candidate Details:
    - Job Title: ${jobTitle}
    - Experience Level: ${experienceLevel}
    - Technology Stack: ${techStack}

    Rules:
    1. Return ONLY the project description text.
    2. Do not include headings like "Project", "Project Description", "Description", or any labels.
    3. Do not include explanations, suggestions, notes, or extra text.
    4. Do not use markdown formatting, bullet points, numbering, or quotes.
    5. Write in professional resume style.
    6. Avoid first-person words like "I", "my", "me", or "we".
    7. Generate a realistic project description suitable for the given job title.
    8. Match project complexity according to the experience level.
    9. Naturally include the provided technology stack.
    10. Highlight:
        - Application purpose
        - Main features
        - Technical implementation
        - Development practices
        - Relevant technical concepts
    11. Include ATS-friendly keywords related to the job role.
    12. Do not invent:
        - company names
        - client names
        - fake users
        - revenue
        - percentages
        - unrealistic achievements
    13. Keep the description between 50 and 80 words.
    14. Return a single paragraph only.
    15. Make it recruiter-friendly and suitable for a professional resume.

    Generate the ATS-friendly project description now.
    `;

    const result = await generateAiContent(prompt);

    if (!result) {
    return NextResponse.json<ApiResponse>(
        {
            success: false,
            message: "Failed to generate project description"
        },
        { status: 500 }
    );
}

    const projectDescription = result;

    return NextResponse.json<ApiResponse>({
        success: true,
        message: "Project description created",
        data: projectDescription
    }, { status: 201 });
  } catch (error) {
    console.log("Error in generate project description Api!");
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
