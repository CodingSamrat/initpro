import LandingPage from '@/components/LandingPage'
import React from 'react'

const page = () => {
    return (
        <div>
            <LandingPage
                title={'Admin Dashboard'}
                message={'Use this page to create admin panel or you can remove as well if it is not necessary.'}
            />
        </div>
    )
}

export default page
