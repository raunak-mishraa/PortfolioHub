import { UploadImage } from "@/lib/upload-image";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";
import ProjectModel from "@/models/project.model";
import dbConnect from "@/lib/dbConnect";
// import mongoose from "mongoose";

export async function POST(request: NextRequest){
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user as User;

    if (!session || !session.user) {
        return NextResponse.json(
          { success: false, message: 'Not authenticated' },
          { status: 401 }
        );
      }
    const formData = await request.formData()
    const {liveUrl, githubUrl, stack, category} = Object.fromEntries(formData);
    
    if(!liveUrl || !githubUrl || !stack || !category){
        return NextResponse.json({message: "All fields are required"},{
            status:400
        });
    }
    const image = formData.get("image") as File;
    if(!image){
        return NextResponse.json({message: "Image is required"},{
            status:400
        });
    }
    const imageUrl:any = await UploadImage(image, "codescroll");
    if(!imageUrl.url){
        return NextResponse.json({message: "Image upload failed"},{
            status:400
        });
    }
    console.log(user._id, liveUrl, githubUrl, imageUrl.url, stack, category);
    // console.log(typeof newUser);
    const newProject = await ProjectModel.create({
        userId: user._id,
        liveUrl,
        githubUrl,
        imageUrl: imageUrl.url,
        stack:JSON.parse(stack.toString()),
        projectType: category
    })
    // const useid = newProject?.userId;
    // console.log(typeof useid);
    
    return NextResponse.json({message: "Project created successfully"},{
        status:200
    });
}