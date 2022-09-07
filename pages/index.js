import Head from 'next/head'
import Image from 'next/image'
import { Fragment } from 'react'
import Navbar from '../components/shared/layout/Navbar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className='h-screen flex flex-col text-zinc-50'>
      <Navbar />
      <section className='xl:px-44 md:px-12 flex flex-grow items-stretch justify-center m-auto gap-x-36 z-10'>
        {/* Image */}
        <div className='flex-grow flex-col items-stretch justify-end sm:flex hidden'>
          <div className='bg-landing-page flex-grow max-h-[86vh] min-w-[20vw]
          bg-contain bg-no-repeat bg-left-bottom'></div>
        </div>
        {/* Call To Action */}
        <div className='flex flex-col gap-y-2 sm:items-start items-center self-center sm:text-start text-center'>
          <h1 className='font-semibold lg:text-7xl text-5xl'>Rediscover your<br /> taste</h1>
          <span className='text-2xl mb-8'>Your new favorite song is just a few clicks away!</span>
          <button className='bg-red-800 p-4 rounded-lg lg:text-xl text-lg'>Discover Now</button>
        </div>
      </section>

      {/* Circles */}
      <div className='fixed z-0'>
        <div className='fixed -bottom-24 -left-14 w-80 h-80 bg-[#E92727] bg-opacity-30 rounded-full'/>
        <div className='fixed top-24 left-96 w-64 h-64 bg-[#E92727] bg-opacity-30 rounded-full'/>
        <div className='fixed bottom-2 right-4 w-96 h-96 bg-[#E92727] bg-opacity-30 rounded-full'/>
      </div>
    </div>
  )
}
