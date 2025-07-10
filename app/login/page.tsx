"use client";

import { set } from "mongoose";
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RootState, AppDispatch } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, clearUser } from '@/store/userSlice'
import { useEffect } from 'react'


function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const user = useSelector((state: RootState) => state.user.currentUser)
    const dispatch = useDispatch<AppDispatch>()

    const router = useRouter()

    useEffect(() => {
        // Simulated login - replace with getServerSession or API
        dispatch(setUser({ id: '123', email: 'harsh@email.com' }))
    }, [])

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
                const session = await getSession()
                const user = session?.user

                console.log("user", user)

                if (user) {
                    dispatch(setUser({
                        id: user.id ?? '', // if you're adding ID in session
                        email: user.email ?? '',
                    }))
                }

                router.push("/")
            } else {
                console.log(result)
            }
        } catch (error) {
            console.log(error)
        } finally {
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