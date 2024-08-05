import { Document, Schema } from 'mongoose';

interface UserId {
    fullName: string;
}

export interface Project extends Document {
    userId: UserId; 
    liveUrl: string;
    githubUrl: string;
    imageUrl: string;
    stack: string[];
    likes: number;
    projectType: string;
}