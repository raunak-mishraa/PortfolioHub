import mongoose,{Schema, Document} from "mongoose";

interface User extends Document {
    fullName: string;
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
}

const userSchema: Schema<User> = new Schema({
    fullName:{
        type: String,
        required: true,
        trim: true,
    },
    username:{
        type: String,
        required: [true, 'Username is required'],
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
        required: [true, 'Password is required'],
        minlength: 6,
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
    }
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema);
export default UserModel;