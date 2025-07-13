import mongoose, { Schema, model, models } from "mongoose";


export const VIDEO_DIMENSIONS = {
    width: 1080,
    height: 1920
} as const;

export interface IVideo {
    _id?: mongoose.Types.ObjectId;
    name: string;
    userId: mongoose.Types.ObjectId;
    description?: string;
    url: string;
    thubnailUrl?: string;
    controls?: boolean;
    videoType?: string[];
    viewType?: string;
    transformations?: {
        height: number;
        width: number;
        quality?: number;
    }
    likes?: mongoose.Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}

const videoSchema = new Schema<IVideo>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    url: {
        type: String,
        required: true,
    },
    thubnailUrl: {
        type: String,
    },
    controls: {
        type: Boolean,
        default: true,
    },
    videoType: {
        type: [String],
    },
    viewType: {
        type: String,
        enum: ["private", "public"],
        default: "public",
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    transformations: {
        height: {
            type: Number,
            default: VIDEO_DIMENSIONS.height,
        },
        width: {
            type: Number,
            default: VIDEO_DIMENSIONS.width,
        },
        quality: {
            type: Number,
            min: 1,
            max: 100
        }
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
}, { timestamps: true });

export const Video = models.Video || model<IVideo>("Video", videoSchema);

