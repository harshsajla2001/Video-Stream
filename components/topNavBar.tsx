'use client';
import React from 'react'
import { SidebarTrigger } from './ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'

function TopNavBar() {
    const router = useRouter()

    const handleLogout = () => {
        // Implement logout logic here
        console.log("User logged out");
        router.push('/login'); // Redirect to login page after logout
    }
    return (
        <div className='sticky top-0 flex w-full border-2 border-purple-700 bg-white justify-between items-center'>
            <SidebarTrigger />
            <input
                className="p-2 m-1 border-2 border-gray-200 rounded-3xl min-2xl:"
                placeholder='Search'
                type="text"

            />
            <div className="flex gap-4 mx-2">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => router.push('/profile')}>Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push('/profile/upload')}>Upload video</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className='text-red-500 hover:text-red-700'>logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>

        </div>
    )
}

export default TopNavBar