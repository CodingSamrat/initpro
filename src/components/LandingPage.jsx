import React from 'react'

const LandingPage = ({ title, message }) => {
    return (
        <main className='w-full  flex flex-col items-center justify-center'>
            <h1 className='mt-20 font-bold text-3xl text-accent'>{title}</h1>
            <div className='text-muted-content mt-4 text-[15px] text-center'>
                <p>This is <span className='lowercase'>{title}</span> page!</p>
                <p>{message}</p>
            </div>
        </main>
    )
}

export default LandingPage
