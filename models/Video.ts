import mongoose, { Schema, model, models } from "mongoose";


export const VIDEO_DIMENSIONS = {
    width: 1080,
    height: 1920
} as const;

export interface IVideo {
    _id?: mongoose.Types.ObjectId;
    name: string;
    description?: string;
    url: string;
    thubnailUrl?: string;
    controls?: boolean;
    transformations?: {
        height: number;
        width: number;
        quality?: number;
    }
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
    }
}, { timestamps: true });

export const Video = models.Video || model<IVideo>("Video", videoSchema);

