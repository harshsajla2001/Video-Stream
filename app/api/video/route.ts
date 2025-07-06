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
        console.log("🔐 Checking session...");
        const session = await getServerSession(authOptions);
        if (!session) {
            console.warn("❌ No session found. User is not authenticated.");
            return NextResponse.json(
                { error: "You must be signed in to create a video" },
                { status: 401 }
            );
        }
        console.log("✅ Session active for user:", session.user?.email);

        console.log("📡 Connecting to database...");
        await connetToDatabase();
        console.log("✅ Connected to database.");

        const body: IVideo = await request.json();
        console.log("📥 Request body received:", body);

        if (!body.name || !body.url) {
            console.warn("⚠️ Missing required video fields:", {
                title: body.name,
                description: body?.description,
                videoUrl: body.url,
            });
            return NextResponse.json(
                { error: "Video data is required" },
                { status: 400 }
            );
        }

        const videoData = {
            ...body,
            controls: body.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformations?.quality ?? 100,
            },
        };

        console.log("🛠️ Final videoData to be saved:", videoData);

        const newVideo = await Video.create(videoData);
        console.log("✅ New video created with ID:", newVideo._id);

        return NextResponse.json(newVideo);
    } catch (error) {
        console.error("🔥 Failed to create video:", error);
        return NextResponse.json(
            { error: "Failed to create video" },
            { status: 500 }
        );
    }
}
