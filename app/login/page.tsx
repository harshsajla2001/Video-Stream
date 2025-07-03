"use client";

import { set } from "mongoose";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const router = useRouter()

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
        try {
            setLoading(true)
           const result = await signIn("credentials", {
                email,
                password,
                redirect: false
            })
            if (result?.ok) {
                console.log(result)
            }else {
                router.push("/")
                
            }
        }catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" disabled={loading}>{loading ? "Loading..." : "Login"}</button>
            </form>
            <div className=" mt-4 ">
                Don&apos;t have an account?
                <button onClick={() => router.push("/register")}>Register</button>
            </div>
        </div>
    )
}

export default LoginPage