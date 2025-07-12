import React from 'react'
import { SidebarTrigger } from './ui/sidebar'

function TopNavBar() {
    return (
        <div className='sticky h-80 top-0 flex w-full border-2 border-purple-700 bg-white justify-between items-center'>
            <SidebarTrigger />
            <input
                className="p-2 m-1 border-2 border-gray-200 rounded-3xl min-2xl:"
                placeholder='Search'
                type="text"

            />
            <div className="flex gap-4 mx-2">avatar</div>

        </div>
    )
}

export default TopNavBar