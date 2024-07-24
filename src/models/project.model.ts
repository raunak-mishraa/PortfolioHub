import mongoose, {Schema, Document} from "mongoose";

export interface Project extends Document {
    userId: Schema.Types.ObjectId; 
    liveUrl: string;
    githubUrl: string;
    imageUrl: string;
    stack: string[];
    likes: number;
    projectType: string;
}

const projectSchema:Schema<Project> = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    liveUrl:{
        type: String,
        required: [true, 'Live URL is required'],
    },
    githubUrl:{
        type: String,
        required: [true, 'Github URL is required'],
    },
    imageUrl:{
        type: String,
        required: [true, 'Image URL is required'],
    },
    stack:{
        type: [String],
        required: true,
    },
    likes:{
        type: Number,
        default: 0,
    },
    projectType:{
        type: String,
        required: true,
    }
}, {timestamps: true});

const ProjectModel = (mongoose.models.Project as mongoose.Model<Project>) || mongoose.model<Project>("Project", projectSchema);
export default ProjectModel;
