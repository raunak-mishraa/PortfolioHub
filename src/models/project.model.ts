import mongoose, { Schema, Document } from 'mongoose';

// export interface Like extends Document {
//     userId: mongoose.Types.ObjectId;
// }

// const LikeSchema: Schema<Like> = new Schema({
//     userId: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//     },
// }, { timestamps: true });
// const LikeSchema = new Schema({
//     userId: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//     },
// });


export interface Project extends Document {
    userId: mongoose.Types.ObjectId;
    liveUrl: string;
    githubUrl: string;
    imageUrl: string;
    stack: string[];
    likes: number;
    projectType: string;
    likesId: mongoose.Types.ObjectId[];
}

const projectSchema: Schema<Project> = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    liveUrl: {
        type: String,
        required: [true, 'Live URL is required'],
    },
    githubUrl: {
        type: String,
        required: [true, 'Github URL is required'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required'],
    },
    stack: {
        type: [String],
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    projectType: {
        type: String,
        required: true,
    },
    likesId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
}, { timestamps: true });

const ProjectModel = (mongoose.models.Project as mongoose.Model<Project>) || mongoose.model<Project>('Project', projectSchema);
export default ProjectModel;
