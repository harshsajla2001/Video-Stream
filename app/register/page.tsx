"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("📝 Submitting form with:", { email, password, confirmPassword });

        try {
            // ❌ You had the logic inverted here
            if (password !== confirmPassword) {
                console.warn("❌ Passwords do not match.");
                alert("Passwords do not match");
                return;
            }

            console.log("📡 Sending registration request to /api/auth/register...");

            const res = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            console.log("📬 Response received:", res);

            // ❌ You had the success/failure check inverted
            if (!res.ok) {
                const errorData = await res.json();
                console.error("❌ Registration failed:", errorData);
                throw new Error(errorData.error || "Registration failed");
            }

            console.log("✅ Registration successful! Redirecting to /login...");
            router.push("/login");
        } catch (error) {
            console.error("❌ Error during registration:", error);
        }
    };

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
                <button className=" text-gray-900 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={handleSubmit}>Register</button>
            </div>
        </div>
    );
}

export default RegisterPage;