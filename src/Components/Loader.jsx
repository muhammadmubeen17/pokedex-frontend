import React from 'react'
import { Triangle } from 'react-loader-spinner';
import { Loader, Placeholder } from 'rsuite';

function PageLoader() {
    return (
        <div className='bg-white fixed top-0 bottom-0 left-0 right-0'>
            {/* <Triangle
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
            /> */}
            <div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
                <span className='sr-only'>Loading...</span>
                <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
            </div>
        </div>
    )
}

export default PageLoader