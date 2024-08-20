"use client"


import Logo from '../Logo'
import { RootMenu } from '@/constant/menu'
import { Icons } from '@/constant/icon'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const RootNavbar = () => {
    const pathName = usePathname()
    return (
        <nav className='shadow h-14 flex items-center justify-between px-3 md:px-10'>
            <div>
                <Logo />
            </div>

            <div className='flex gap-5 items-center'>
                <div className='flex gap-3 items-center'>
                    {RootMenu.map((menu, i) => (
                        <Link href={menu.pathName} key={i}>
                            <h3 className={`font-bold flex gap-1 items-center ${pathName === menu.pathName ? "text-accent" : ""} transition-all duration-300`}>
                                {/* <span>{menu.icon}</span> */}
                                <span>{menu.title}</span>
                            </h3>
                        </Link>
                    ))}
                </div>

                <div className=''>
                    <button className='w-10 h-10 bg-fill-1 rounded-full flex justify-center text-xl text-muted-content items-center'>
                        {Icons.user}
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default RootNavbar