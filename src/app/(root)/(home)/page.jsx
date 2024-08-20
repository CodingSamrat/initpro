import React from 'react'
import Counter from './Counter'

const page = () => {
    return (
        <main className='flex flex-col items-center justify-center'>
            <h1 className='mt-20 font-bold text-3xl '>Welcome to &nbsp; <span className='text-accent'>Next - InitPro</span></h1>

            <div>
                <Counter />
            </div>
        </main>
    )
}

export default page
