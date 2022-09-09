import Link from 'next/link';
import React, { useContext } from 'react'
import { BsSpotify, BsGithub } from 'react-icons/bs'
import { AuthContext } from '../../../context/auth-context';
import { AUTH_ENDPOINT, RESPONSE_TYPE } from '../../../pages';

const HamburgerMenu = () => {
    const { token, logout } = useContext(AuthContext);

    return (
        <div className='bg-slate-700'>
            <div className='gap-x-6 sm:hidden flex flex-col items-start px-14'>
                <a href='https://github.com/gandalf113/soundspace' target="_blank" className='p-2 hover:underline flex items-center gap-x-2 cursor-pointer'>
                    <BsGithub />
                    Github
                </a >

                {token && <Link href='/lab'>
                    <button className='p-2 hover:underline'>
                        Music Lab
                    </button>
                </Link>}

                {token ?
                    <button onClick={logout} className='p-2 hover:underline'>
                        Logout
                    </button> :
                    <a
                        href={`${AUTH_ENDPOINT}?client_id=${process.env.SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
                        className='p-2 hover:underline flex items-center gap-x-2 cursor-pointer'>
                        <BsSpotify />
                        <span>Log In</span>
                    </a>
                }
            </div>
        </div>
    )
}

export default HamburgerMenu