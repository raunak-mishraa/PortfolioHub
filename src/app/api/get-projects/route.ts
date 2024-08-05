import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/models/project.model";
import { NextRequest, NextResponse } from "next/server";

const PAGE_SIZE = 6;

async function getProjects(queryConditions: object, pageNumber: number) {
  return ProjectModel.find(queryConditions)
    .limit(PAGE_SIZE)
    .skip((pageNumber - 1) * PAGE_SIZE)
    .sort({ createdAt: -1 })
    .populate({
      path: 'userId',
      select: '-verifyCode -verifyCodeExpiry'
    });
}

async function getCount(queryConditions: object) {
  return ProjectModel.countDocuments(queryConditions);
}

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const pageParam = searchParams.get('page');
    const pageNumber: number = pageParam ? parseInt(pageParam) : 1;
    const searchQuery = searchParams.get('search') || '';
    const categoryQuery = searchParams.get('category') || '';

    const queryConditions: any = {};
    if (searchQuery) {
      queryConditions.$or = [
        { stack: { $regex: searchQuery, $options: 'i' } },
        { projectType: { $regex: searchQuery, $options: 'i' } }
      ];
    } else if (categoryQuery) {
      queryConditions.$or = [
        { projectType: { $regex: categoryQuery, $options: 'i' } },
        { stack: { $regex: categoryQuery, $options: 'i' } }
      ];
    }

    const [projects, count] = await Promise.all([
      getProjects(queryConditions, pageNumber),
      getCount(queryConditions)
    ]);

    const totalPages = Math.ceil(count / PAGE_SIZE);

    if (projects.length === 0) {
      return NextResponse.json({ message: "No projects found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Projects fetched successfully",
      projects,
      totalPages
    });

  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
