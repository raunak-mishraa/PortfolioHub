import {z} from 'zod';

export const projectSchema = z.object({
    liveUrl: z.string().url({message: "Invalid url"}),
    githubUrl: z.string().url({message: "Invalid url"}),
    stack: z.string().min(2, {message: "Stack must be at least 2 characters"}),
    category: z.string().min(2, {message: "Category must be at least 2 characters"}),
})