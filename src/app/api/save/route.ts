import { NextResponse, NextRequest } from "next/server";

export async function PUT(req:NextRequest) {
    const { id, save } = await req.json();
    console.log(id, save)
    return NextResponse.json({message:"project saved"})
}