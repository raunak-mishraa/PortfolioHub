// async function fetchData(page:number) {
//     try {
//       await dbConnect();
//       const pageSize:number = 6;
//       const pageNumber:number = page || 1;
//       const count = await ProjectModel.find().countDocuments();
//       console.log(count);
//       const projects = await ProjectModel.find()
//         .limit(pageSize)
//         .skip((pageNumber - 1) * pageSize);
//         console.log(projects);
//       const totalPages = Math.ceil(count / pageSize);
//       if(!projects || projects.length === 0) {
//         throw new Error("No projects found");
//       }
//       return {projects, totalPages};
        
//     } catch (error) {
//       console.log(error);
      
//     }
//   }


import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/models/project.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    await dbConnect();
    try {
    const { searchParams } = new URL(request.url);
    const pageSize:number = 6;
    const pageNumber:any = searchParams.get('page') || 1;
    console.log(pageNumber, 'backend');
    const count = await ProjectModel.find({}).countDocuments();
    const projects = await ProjectModel.find({})
        .limit(pageSize)
        .skip((pageNumber - 1) * pageSize)
        .sort({createdAt: -1})
        .populate({
            path: 'userId',
            select: '-verifyCode -verifyCodeExpiry'
        });
    const totalPages = Math.ceil(count / pageSize);
    if(!projects || projects.length === 0) {
        throw new Error("No projects found");
    }
    return NextResponse.json({
        message: "Projects fetched successfully",
        projects, 
        totalPages});
    } catch (error) {
        throw new Error("No page found");
    }
}