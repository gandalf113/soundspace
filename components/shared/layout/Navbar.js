import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

const NAVIGATION = [
  {
    id: 1,
    text: 'Music Lab',
    url: '/lab'
  }
]

const Navbar = () => {
  return (
    <motion.div
      initial={{ y: -300 }}
      animate={{ y: 0 }}
      className='flex items-center justify-between py-3 px-12 text-white text-xl'>
      <Link href='/'>
        <div className='flex items-center gap-x-2 cursor-pointer'>
          <Image src='/logo.svg' alt='logo' width={48} height={48} />
          <span className='text-2xl font-thin'>Soundspace</span>
        </div>
      </Link>
      <div className='gap-x-6 sm:flex hidden'>
        {NAVIGATION.map(nav => (
          <Link key={nav.id} href={nav.url}>
            <button className='p-2'>
              {nav.text}
            </button>
          </Link>
        ))}
      </div>

    </motion.div>
  )
}

export default Navbar