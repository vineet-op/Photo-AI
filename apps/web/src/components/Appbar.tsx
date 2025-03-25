import React from 'react'
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import { Button } from './ui/button'

const Appbar = () => {
    return (
        <div className='w-full text-black bg-blue-500 flex justify-between items-center p-5'>
            <div className='text-3xl font-bold text-white '>
                PhotoAi
            </div>
            <div className='gap-4 flex'>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}

export default Appbar