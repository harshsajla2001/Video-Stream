import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
    email: string;
    password: string;
    name?: string;
    country?: string;
    phoneNumber?: string;
    profilePicture?: string;
}

const userSchema = new Schema<IUser>({

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        default: "",
    },
    country: {
        type: String,
        default: "",
    },
    phoneNumber: {
        type: String,
        default: "",
    },
    profilePicture: {
        type: String,
        default: "",
    },
    

}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

export const User = models.User || model<IUser>("User", userSchema);


