import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import ProjectModel from '@/models/project.model';
import dbConnect from '@/lib/dbConnect';
import mongoose from 'mongoose';

export async function PUT(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    try {
        await dbConnect();
        if (!user) {
            return NextResponse.json({ error: 'You need to be logged in to like or unlike a project' }, { status: 401 });
        }

        const userObjectId = new mongoose.Types.ObjectId(user._id);
        const { id, liked } = await request.json();
        console.log(id, liked);
        const project = await ProjectModel.findById(id);
        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        // const userId = userObjectId;
        console.log(liked)
        if(liked){
            const alreadyLiked = project.likesId.some((like:any) => like._id.equals(userObjectId));
            console.log(alreadyLiked, 'alreadyLiked');
            if(!alreadyLiked){
                project.likesId.push(userObjectId);
                project.likes += 1;
            }
        }
        else{
            console.log('unlike');
            project.likesId = project.likesId.filter((like:any) => !like._id.equals(userObjectId));
            project.likes -= 1;
            
        }
        await project.save();
        console.log(project);
       

        return NextResponse.json({ message: liked ? 'Liked' : 'Unliked' });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
