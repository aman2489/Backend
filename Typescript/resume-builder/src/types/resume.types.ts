import { Types } from "mongoose";

export interface IPersonalInfo {
    fullname: string;
    email: string;
    mobile: string;
    location: string;
    github: string;
    linkedIn: string;
    portfolio: string;
}

export interface IWorkExperience {
    company: string;
    positon: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface IProjects {
    title: string;
    decription: string;
    githubUrl: string;
    liveLink: string;
    techStack: string[];
}

export interface IEducation {
    institute: string;
    degree: string;
    startDate: string;
    endDate: string;
}

export interface IResume {
    _id?: string;
    user_id: Types.ObjectId;
    title: string;
    summary: string;
    personalInfo: IPersonalInfo;
    workExperience?: IWorkExperience[];
    skills: string[];
    projects: IProjects[];
    education: IEducation[];
    certifications?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}