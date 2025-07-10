"use client";

import Feed from "./components/Feed";
import FileUpload from "./components/FileUpload";
import "./globals.css";

export default function Home() {
  const handleSuccess = (url: any) => {
    console.log("Upload successful. File URL:", url);
  };

  const handleProgress = (progress: number) => {
    console.log(`Upload progress: ${progress}%`);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Feed />
      <FileUpload onSuccess={handleSuccess} onProgress={handleProgress} fileType="video" />
    </div>
  );
}
