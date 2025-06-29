import { NextRequest, NextResponse } from "next/server";
import connetToDatabase from "@/lib/db";
import {User} from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {

    try{
        const {email, password} = await request.json();
        
        if(!email || !password) {
            return NextResponse.json({error: "Email and password are required"}, {status: 400});
        }

        await connetToDatabase();

        const user = await User.findOne({email});

        if(user) {
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }


       await User.create({
            email,
            password
        });

        return NextResponse.json({message: "User created successfully"}, {status: 200});

    } catch (error) {
        console.log("User Regestration error",error);
        return NextResponse.json({error: "Something went wrong"}, {status: 500});
    }


}

