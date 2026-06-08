import { getCurrentUser } from "@/lib/getCurrentUser";
import connectToMongoDB from "@/lib/mongodb";
import resumeModel from "@/models/resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try{
        await connectToMongoDB();
        const userId = await getCurrentUser();

        const newResume = await resumeModel.create({
            user_id: userId,
            title: "",
            summary: "",
            personalInfo: {},
            workExperience: [],
            projects: [],
            certifications: [],
            skills: [],
            education: []
        })

        return NextResponse.json<ApiResponse>({
            success: true,
            message: "Resume created successfully",
            data: newResume
        }, { status: 201 });
    }catch(error){
        console.log("Error in creating resume ", error);
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Something went wrong",
            error: error instanceof Error ? error.message : "Unknown error" 
        }, { status: 500 });
    }
}