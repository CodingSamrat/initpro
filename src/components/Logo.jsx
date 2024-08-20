import { PROJECT_NAME } from '@/root.config'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <Link href={'/'}><h1 className='font-bold text-2xl text-accent'>{PROJECT_NAME}</h1></Link>
    )
}

export default Logo
