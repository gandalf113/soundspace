import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NAVIGATION = [
  {
    id: 1,
    text: 'Quick Discovery',
    url: '/'
  },
  {
    id: 2,
    text: 'Music Lab',
    url: '/'
  }
]

const Navbar = () => {
  return (
    <div className='flex items-center justify-between py-3 px-12 text-white text-xl'>
      <div className='flex items-center gap-x-2'>
        <Image src='/logo.png' alt='logo' width={54} height={54}/>
        <span>Soundspace</span>
      </div>
      <div className='gap-x-6 sm:flex hidden'>
        {NAVIGATION.map(nav => (
          <Link key={nav.id} href={nav.url}>
            <button className='p-2'>
              {nav.text}
            </button>
          </Link>
        ))}
      </div>

    </div>
  )
}

export default Navbar