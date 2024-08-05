import mongoose,{Schema, Document} from "mongoose";
import { Project } from "./project.model";
export interface Message extends Document {
    name: string;
    content: string;
    createdAt: Date;
  }

  const MessageSchema: Schema<Message> = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  });

interface User extends Document {
    fullName: string;
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    linkedin: string;
    github: string;
    savedProjects: Project[];
    messages: Message[];
}

const userSchema: Schema<User> = new Schema({
    fullName:{
        type: String,
        required: true,
        trim: true,
    },
    username:{
        type: String,
        // required: [true, 'Username is required'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^.+@.+\..+$/, 'Please enter a valid email']
    },
    password:{
        type: String,
        // required: [true, 'Password is required'],
        minlength: 6,
        select: false
    },
    verifyCode:{
        type: String,
        required: [true, 'Verify code is required']
    },
    verifyCodeExpiry:{
        type: Date,
        required: [true, 'Verify code expiry is required']
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    linkedin:{
        type: String,
        trim: true,
    },
    github:{
        type: String,
        trim: true,
    },
    savedProjects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }],
    messages: [MessageSchema]
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema);
export default UserModel;