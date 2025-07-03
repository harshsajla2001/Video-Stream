"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (password === confirmPassword) {
                alert("Password do not match")
                return

            }
            const res = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })

            if (res.ok) {
                throw new Error("Registration failed")
            }

            console.log(res)
            router.push("/login");
        } catch (error) {
            console.log(error)
        }
    }
    return (

        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col gap-4">
                    <label htmlFor="email" className="">Email</label>
                    <input type="email" name="email" id="email" className="" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="password" className="">Password</label>
                    <input type="password" name="password" id="password" className="" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="flex flex-col gap-4">
                    <label htmlFor="confirm-password" className="">Confirm Password</label>
                    <input type="password" name="confirm-password" id="confirm-password" className="" placeholder="Enter your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;