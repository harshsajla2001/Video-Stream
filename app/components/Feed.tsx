"use client";
import React, { useEffect, useState } from 'react'
import "../globals.css";


interface Video {
    _id: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    createdAt: string;
}
function Feed() {

    const [videos, setVideos] = useState<Video[]>([]);
    const [error, setError] = useState("");
    useEffect(() => {
        getVideos()
    }, [])



    const getVideos = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/video`);

            if (!res.ok) {
                throw new Error("Failed to fetch videos");
            }

            const data = await res.json();
            console.log("📦 Videos fetched:", data);
            setVideos(data);
        } catch (err: any) {
            console.error("❌ Error fetching videos:", err.message);
            setError("Failed to load videos. Please try again.");
        }
    };

    return (
        <div className='flex gap-4 border-2 border-red-500 w-full'>
            <div className="w-full flex-wrap justify-start flex gap-4 border-2 border-yellow-500 overflow-auto">

                <div className="flex flex-col gap-4 w-1/4 h-40 border-2 border-blue-500">
                    <div className="">
                        <h1>Video card</h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1>Video card heading</h1>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-1/4 h-40 border-2 border-blue-500">
                    <div className="">
                        <h1>Video card</h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1>Video card heading</h1>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-1/4 h-40 border-2 border-blue-500">
                    <div className="">
                        <h1>Video card</h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1>Video card heading</h1>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-1/4 h-40 border-2 border-blue-500">
                    <div className="">
                        <h1>Video card</h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1>Video card heading</h1>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-1/4 h-40 border-2 border-blue-500">
                    <div className="">
                        <h1>Video card</h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1>Video card heading</h1>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-1/4 h-40 border-2 border-blue-500">
                    <div className="">
                        <h1>Video card</h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1>Video card heading</h1>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-1/4 h-40 border-2 border-blue-500">
                    <div className="">
                        <h1>Video card</h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1>Video card heading</h1>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-1/4 h-40 border-2 border-blue-500">
                    <div className="">
                        <h1>Video card</h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1>Video card heading</h1>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-1/4 h-40 border-2 border-blue-500">
                    <div className="">
                        <h1>Video card</h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1>Video card heading</h1>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-1/4 h-40 border-2 border-blue-500">
                    <div className="">
                        <h1>Video card</h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1>Video card heading</h1>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-1/4 h-40 border-2 border-blue-500">
                    <div className="">
                        <h1>Video card</h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1>Video card heading</h1>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-1/4 h-40 border-2 border-blue-500">
                    <div className="">
                        <h1>Video card</h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1>Video card heading</h1>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-1/4 h-40 border-2 border-blue-500">
                    <div className="">
                        <h1>Video card</h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1>Video card heading</h1>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-1/4 h-40 border-2 border-blue-500">
                    <div className="">
                        <h1>Video card</h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1>Video card heading</h1>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-1/4 h-40 border-2 border-blue-500">
                    <div className="">
                        <h1>Video card</h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1>Video card heading</h1>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-1/4 h-40 border-2 border-blue-500">
                    <div className="">
                        <h1>Video card</h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1>Video card heading</h1>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-1/4 h-40 border-2 border-blue-500">
                    <div className="">
                        <h1>Video card</h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1>Video card heading</h1>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-1/4 h-40 border-2 border-blue-500">
                    <div className="">
                        <h1>Video card</h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1>Video card heading</h1>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-1/4 h-40 border-2 border-blue-500">
                    <div className="">
                        <h1>Video card</h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1>Video card heading</h1>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-1/4 h-40 border-2 border-blue-500">
                    <div className="">
                        <h1>Video card</h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1>Video card heading</h1>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Feed