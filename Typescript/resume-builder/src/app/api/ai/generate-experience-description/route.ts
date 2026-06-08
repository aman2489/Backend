import { generateAiContent } from "@/lib/gemini";
import { GenerateExperienceDescriptionBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateExperienceDescriptionBody = await req.json();

    const { experienceLevel, yearsOfExperience, techStack, jobRole } = body;

    if (!experienceLevel || !yearsOfExperience || !techStack || !jobRole)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Missing fields",
        },
        { status: 400 },
      );

    const prompt = `
    You are an expert ATS resume writer and professional technical recruiter.

    Generate a professional ATS-friendly work experience description for a resume using the provided candidate information.

    Candidate Information:
    - Job Role: ${jobRole}
    - Experience Level: ${experienceLevel}
    - Years of Experience: ${yearsOfExperience}
    - Technology Stack: ${techStack}

    Rules:
    1. Return ONLY the work experience description text.
    2. Do not include headings like "Work Experience", "Experience", "Description", "Responsibilities", or any labels.
    3. Do not include explanations, suggestions, notes, or extra text.
    4. Do not use markdown formatting, bullet points, numbering, or quotes.
    5. Write in a professional resume style.
    6. Avoid first-person words like "I", "my", "me", or "we".
    7. Generate responsibilities appropriate for:
    - the given job role
    - experience level
    - years of experience.
    8. Naturally include the provided technology stack.
    9. Highlight:
    - daily responsibilities
    - technical contributions
    - software development practices
    - tools and technologies used
    - architecture/design involvement based on experience
    - optimization and maintenance work.
    10. Use strong ATS action verbs such as:
        Developed,
        Designed,
        Implemented,
        Integrated,
        Optimized,
        Maintained,
        Collaborated,
        Delivered.
    11. Adjust seniority:
        - Fresher/Entry level: focus on learning, implementation, projects, coding skills.
        - Mid level: focus on ownership, features, optimization, scalable solutions.
        - Senior level: focus on architecture, system design, mentoring, technical decisions.
    12. Do not invent:
        - company names
        - fake employers
        - fake certifications
        - unrealistic achievements
        - revenue numbers
        - performance percentages.
    13. Keep the description between 70 and 120 words.
    14. Return a single paragraph only.
    15. Make it professional, realistic, ATS optimized, and recruiter-friendly.

    Generate the work experience description now.
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

    const workDescription = result;

    return NextResponse.json<ApiResponse>({
        success: true,
        message: "Work experience description created",
        data: workDescription
    }, { status: 201 });
  } catch (error) {
    console.log("Error in generate work experience description Api!");
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
