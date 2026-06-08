import { generateAiContent } from "@/lib/gemini";
import { GenerateSummaryBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateSummaryBody = await req.json();

    const { experienceLevel, jobTitle, skills } = body;

    if (!experienceLevel || !skills || !jobTitle)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Missing fields",
        },
        { status: 400 },
      );

    const prompt = `
    You are an expert ATS resume writer and professional career consultant.

    Generate a highly professional, ATS-friendly resume summary based on the details provided.

    Candidate Details:
    - Job Title: ${jobTitle}
    - Skills: ${skills}
    - Experience Level: ${experienceLevel}

    Rules:
    1. Return ONLY the resume summary text.
    2. Do not include headings like "Summary", "Resume Summary", or any labels.
    3. Do not include explanations, suggestions, bullet points, quotes, or markdown formatting.
    4. Write in professional resume style (avoid "I", "my", "me").
    5. Optimize the summary with relevant industry keywords for ATS scanning.
    6. Naturally include the provided skills where relevant.
    7. Highlight technical expertise, experience level, problem-solving ability, and professional value.
    8. Keep the summary strictly between 50 and 80 words.
    9. Make it sound natural, confident, and recruiter-friendly.
    10. Do not invent fake companies, degrees, certifications, achievements, or years of experience.
    11. Tailor the summary specifically for the provided job title.
    12. Ensure the response is a single paragraph only.

    Generate the ATS-friendly resume summary now.
    `;

    const result = await generateAiContent(prompt);

    const sumamry = result;

    return NextResponse.json<ApiResponse>({
        success: true,
        message: "Summary created",
        data: sumamry
    }, { status: 201 });
  } catch (error) {
    console.log("Error in generate summary Api!");
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
