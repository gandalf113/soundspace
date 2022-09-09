import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import { AuthContext } from '../../../context/auth-context'
import { BsSpotify, BsGithub } from 'react-icons/bs'
import { AiOutlineMenu } from 'react-icons/ai'
import { AUTH_ENDPOINT, RESPONSE_TYPE } from '../../../pages'
import { UIContext } from '../../../context/ui-context'

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
  const { hamburgerMenuIsOpen, toggleHamburgerMenu } = useContext(UIContext);

  const [isScrolled, setIsScrolled] = useState(false);

  const [currentVariant, setVariant] = useState('transparent')

  /**
   * Change the navbar color depending on scroll position
   */
  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest > 10) setIsScrolled(true);
      else setIsScrolled(false);

      if (!hamburgerMenuIsOpen) {
        const variant = latest > 10 ? 'visible' : 'transparent';
        setVariant(variant);
      }
    })
  }, [])

  useEffect(() => {
    if (hamburgerMenuIsOpen) setVariant('visible')
    else if (!isScrolled) setVariant('transparent')
  }, [hamburgerMenuIsOpen])

  return (
    <motion.nav
      variants={variants}
      animate={currentVariant}
      className='w-full flex items-center justify-between py-3 px-12 text-white text-xl z-30'>

      {/* Logo */}
      <Link href='/'>
        <div className='flex items-center gap-x-2 cursor-pointer'>
          <Image src='/logo.svg' alt='logo' width={48} height={48} />
          <span className='text-2xl font-thin'>Soundspace</span>
        </div>
      </Link>

      {/* Nav Items */}
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
            <span>Log In</span>
          </a>
        }
      </div>

      <button className='sm:hidden' onClick={toggleHamburgerMenu}>
        <AiOutlineMenu />
      </button>
    </motion.nav>
  )
}

export default Navbar