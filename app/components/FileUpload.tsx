"use client"

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { useRef, useState } from "react";

interface FileUploadProps {
    onSuccess: (url: any) => void;
    onProgress: (progress: number) => void;
    fileType?: "image" | "video";
}
const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateFile = (file: File) => {
        console.log("🔍 Validating file:", {
            name: file.name,
            type: file.type,
            sizeMB: (file.size / (1024 * 1024)).toFixed(2) + "MB",
        });

        if (fileType === "video") {
            if (!file.type.startsWith("video/")) {
                console.warn("❌ Invalid file type for video:", file.type);
                setError("Please upload a valid video file.");
                return false;
            } else {
                console.log("✅ File is a valid video.");
            }
        }

        if (file.size > 100 * 1024 * 1024) {
            console.warn("❌ File too large:", (file.size / (1024 * 1024)).toFixed(2), "MB");
            setError("Please upload a file less than 100MB.");
            return false;
        }

        console.log("✅ File passed all validations.");
        return true;
    };


    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log("📁 File selected:", file);

        if (!file || !validateFile(file)) {
            console.warn("⚠️ No file selected or file validation failed.");
            return;
        }

        setUploading(true);
        setError(null);
        console.log("⬆️ Starting upload...");

        try {
            console.log("🔐 Requesting ImageKit auth params...");
            const authRes = await fetch("/api/auth/imagekit-auth");

            if (!authRes.ok) {
                console.error("❌ Failed to fetch auth params:", authRes.statusText);
                throw new Error("Failed to get ImageKit auth credentials");
            }

            const auth = await authRes.json();
            console.log("✅ Auth response received:", auth);

            console.log("🚀 Uploading to ImageKit...", auth.authenticationParameters.token);
            const res = await upload({
                file,
                fileName: file.name,
                publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
                signature: auth.authenticationParameters.signature,
                expire: auth.authenticationParameters.expire,
                token: auth.authenticationParameters.token,
                onProgress: (event) => {
                    if (event.lengthComputable && onProgress) {
                        const percent = (event.loaded / event.total) * 100;
                        console.log(`📈 Upload progress: ${Math.round(percent)}%`);
                        onProgress(Math.round(percent));
                    }
                },
            });

            console.log("✅ Upload successful:", res);
            onSuccess?.(res);

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/video`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({  ...res }),
            })

            const data = await response.json();
            console.log("✅ Video created:", data);

        } catch (error) {
            console.error("❌ Upload failed:", error);
            setError("Upload failed. Please try again.");
        } finally {
            console.log("✅ Upload process finished.");
            setUploading(false);
        }
    };



    return (
        <div className="flex flex-col items-center justify-center">
            <input type="file" accept={fileType == "video" ? "video/*" : "image/*"} onChange={handleFileChange} />
            {uploading && <span>Uploading...</span>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default FileUpload;