import UserModel from "@/models/userModel";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";

export async function POST(request: NextRequest) {
    await dbConnect();
    try {
        const { username, fullName, email, password } = await request.json();
        
        const existingVerifiedUserByUsername = await UserModel.findOne({
            username,
            isVerified: true
        });
        
        if (existingVerifiedUserByUsername) {
            return NextResponse.json({
                success: false,
                message: 'Username is already taken',
            }, { status: 400 });
        }

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const existingUserByEmail = await UserModel.findOne({ email });
        
        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return NextResponse.json({
                    success: false,
                    message: 'User already exists with this email',
                }, { status: 400 });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();
            }
        } else {
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new UserModel({
                username: username.toLowerCase(),
                fullName,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
            });
            await newUser.save();
        }

        // Send email verification code
        const emailResponse = await sendVerificationEmail(email, username, verifyCode);
        
        if (!emailResponse.success) {
            return NextResponse.json({
                success: false,
                message: emailResponse.message,
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: 'User registered successfully. Please verify your account.',
        }, { status: 201 });

    } catch (error) {
        console.error('Error registering user:', error);
        return NextResponse.json({
            success: false,
            message: 'Error registering user',
        }, { status: 500 });
    }
}
