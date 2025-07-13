import React from 'react'

function UploadPage() {
    return (
        <div className="flex w-full border flex-col border-red-500 p-4">

            <div className="flex py-2">
                <h1 className="text-2xl font-bold">Upload Your Video File</h1>
            </div>
            <div className="flex gap-4 w-full">

                <div className="flex w-[50%] border-2 border-green-500 p-4">
                    <div className="flex w-full p-2 border-2 border-blue-500">Video Upload Section</div>
                </div>
                <div className="flex  w-full  border-2 border-green-500 p-4">
                    <div className="flex w-full p-2 border-2 border-blue-500">
                        <h1 className="text-2xl font-bold">video details</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadPage