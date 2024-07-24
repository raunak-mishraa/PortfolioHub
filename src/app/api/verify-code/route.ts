import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await dbConnect();
    try {
        const { username, code } = await request.json();
        console.log(username, code)
        const user = await UserModel.findOne({ username });
        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true;
            await user.save();
      
            return Response.json(
              { success: true, message: 'Account verified successfully' },
              { status: 200 }
            );
        }
        else if(!isCodeNotExpired){
            return NextResponse.json(
                { success: false, message: 'Verification code has expired' },
                { status: 400 }
            );
        }
        else{
            return NextResponse.json(
                { success: false, message: 'Invalid verification code' },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('Error verifying user:', error);
        return NextResponse.json(
          { success: false, message: 'Error verifying user' },
          { status: 500 }
        );
    }
}