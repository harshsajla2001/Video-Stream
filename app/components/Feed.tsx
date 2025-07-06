"use client";
import React, { useEffect, useState } from 'react'

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
        <div>Feed</div>
    )
}

export default Feed