import { authOptions } from "@/lib/auth";
import connetToDatabase from "@/lib/db";
import { IVideo, Video } from "@/models/Video";
import { getServerSession } from "next-auth";
import { transform } from "next/dist/build/swc/generated-native";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await connetToDatabase();

        const videos = await Video.find({}).sort({ createdAt: -1 }).limit(10).lean();

        if (!videos || videos.length === 0) {
            return NextResponse.json([], { status: 200 })
        }

        return NextResponse.json(videos)
    } catch (error) {
        return NextResponse.json(
            { error: "Failded tp fetch videos" },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {

    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "You must be signed in to create a video" }, { status: 401 });
        }

        await connetToDatabase();
        const body: IVideo = await request.json();

        if (!body.title || !body.description || !body.videoUrl || !body.thubnailUrl) {
            return NextResponse.json({ error: "Video data is required" }, { status: 400 });
        }

        const videoData = {
            ...body,
            controls: body.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformations?.quality ?? 100,
            }
        }

        const newVideo = await Video.create(videoData);

        return NextResponse.json(newVideo);
    } catch (error) {
        return NextResponse.json({ error: "Failded to create video" }, { status: 500 });
    }
}