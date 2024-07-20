import { UploadImage } from "@/lib/upload-image";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest){
    // const {liveUrl, githubUrl, stack, category} = Object.fromEntries(formData);
    const formData = await request.formData()
    // console.log(formData)
    const image = formData.get("image") as File;
    // console.log(image)
    const data:any = await UploadImage(image, "codescroll");
    console.log(data, "data")
    return NextResponse.json({message: "Project created successfully"},{
        status:200
    });
}