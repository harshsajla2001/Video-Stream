"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (password === confirmPassword) {
                alert("Password do not match")
                return
                
            }
        } catch (error) {
            console.log(error)
        }
    }
    return <div>Register</div>;
}

export default RegisterPage;