import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import { AuthContext } from '../../../context/auth-context'
import { BsSpotify, BsGithub } from 'react-icons/bs'
import { AUTH_ENDPOINT, RESPONSE_TYPE } from '../../../pages'

const NAVIGATION = [
  {
    id: 1,
    text: 'Music Lab',
    url: '/lab'
  }
]

const variants = {
  transparent: {
    backgroundColor: "rgba(51, 65, 85, 0.0)"
  },
  visible: {
    backgroundColor: "rgba(51, 65, 85, 1.0)",
    transition: { duration: 0.3 }
  }
}

const Navbar = () => {
  const { scrollY } = useScroll()

  const { token, logout } = useContext(AuthContext);
  const [currentVariant, setVariant] = useState('transparent')

  /**
   * Change the navbar color depending on scroll position
   */
  useEffect(() => {
    return scrollY.onChange((latest) => {
      const variant = latest > 10 ? 'visible' : 'transparent';
      setVariant(variant);
    })
  }, [])

  return (
    <motion.div
      // initial={{ y: -300 }}
      variants={variants}
      animate={currentVariant}
      className='fixed w-full flex items-center justify-between py-3 px-12 text-white text-xl z-30'>
      <Link href='/'>
        <div className='flex items-center gap-x-2 cursor-pointer'>
          <Image src='/logo.svg' alt='logo' width={48} height={48} />
          <span className='text-2xl font-thin'>Soundspace</span>
        </div>
      </Link>
      <div className='gap-x-6 sm:flex hidden'>
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
            <span>Authenticate</span>
          </a>
        }
      </div>

    </motion.div>
  )
}

export default Navbar