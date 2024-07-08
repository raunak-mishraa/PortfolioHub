import mongoose, {Schema, Document} from "mongoose";

interface Project extends Document {
    userId: string;
    liveUrl: string;
    githubUrl: string;
    imageUrl: string;
    stack: string[];
    likes: number;
    projectType: string;
}

const projectSchema:Schema<Project> = new Schema({
    userId:{
        type: String,
        required: true,
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
});

const ProjectModel = (mongoose.models.Project as mongoose.Model<Project>) || mongoose.model<Project>("Project", projectSchema);
export default ProjectModel;
