import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect, useContext, useRef } from 'react'
import Navbar from '../components/shared/layout/Navbar'
import { BsSpotify } from 'react-icons/bs';
import { FaSlidersH } from 'react-icons/fa';
import { TbFreeRights } from 'react-icons/tb';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/auth-context';
import Link from 'next/link';
import HamburgerMenu from '../components/shared/layout/HamburgerMenu';
import { UIContext } from '../context/ui-context';

export const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
export const RESPONSE_TYPE = "token";

export default function Home() {
  const { token, setToken } = useContext(AuthContext);
  const { hamburgerMenuIsOpen, toggleHamburgerMenu } = useContext(UIContext);

  const learnSectionRef = useRef();

  /**
   * Get the Spotify token
   */
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (hash) {
      token = hash.substring(1).split('&').find(e => e.startsWith("access_token")).split('=')[1];
      console.log(token);

      window.localStorage.setItem("token", token);
      setToken(token);
      window.hash = '';

    }

    if (hamburgerMenuIsOpen) {
      toggleHamburgerMenu();
    }

  }, []);

  const executeScroll = () => learnSectionRef.current.scrollIntoView();

  return (
    <div className='flex flex-col text-zinc-50 overflow-x-hidden'>
      <div className='fixed w-full z-30'>
        <Navbar />
        {hamburgerMenuIsOpen && <HamburgerMenu />}

      </div>
      {/* HERO SECTION */}
      <section className='h-screen xl:px-44 sm:px-12 flex flex-grow items-stretch justify-center m-auto gap-x-36 z-10'>

        {/* Call To Action */}
        <motion.div
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', duration: 0.5, delay: 0.15 }}

          className='flex flex-col gap-y-2 sm:items-start items-center self-center sm:text-start text-center'>
          <h1 className='font-semibold lg:text-7xl text-5xl'>Rediscover your<br /> taste</h1>
          <span className='text-2xl mb-8'>Your new favorite song is just a few clicks away!</span>

          {/* Actions */}
          <div className='flex md:flex-row flex-col items-stretch gap-2'>

            <button
              onClick={executeScroll}
              className="relative inline-flex items-center justify-center overflow-hidden group bg-slate-700 p-4 rounded-lg lg:text-xl text-lg">
              <span className="absolute w-0 h-0 transition-all duration-200 ease-out bg-slate-800 rounded-full group-hover:w-56 group-hover:h-56"></span>
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
              <span className="relative">
                Learn More
              </span>
            </button>

            {!token ? <a href={`${AUTH_ENDPOINT}?client_id=${process.env.SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
              className="relative inline-flex items-center justify-center overflow-hidden group bg-slate-700 p-4 rounded-lg lg:text-xl text-lg">
              <span className="absolute w-0 h-0 transition-all duration-200 ease-out bg-slate-800 rounded-full group-hover:w-56 group-hover:h-56"></span>
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transprent via-transparent to-gray-700"></span>
              <span className="relative flex items-center gap-x-2 text-lg">
                <BsSpotify />
                Login with Spotify
              </span>
            </a> :
              <Link href='/lab'>
                <button
                  className="relative inline-flex items-center justify-center overflow-hidden group bg-slate-700 p-4 rounded-lg lg:text-xl text-lg">
                  <span className="absolute w-0 h-0 transition-all duration-200 ease-out bg-slate-800 rounded-full group-hover:w-56 group-hover:h-56"></span>
                  <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                  <span className="relative">
                    Music Lab
                  </span>
                </button>
              </Link>
            }
          </div>
        </motion.div>
        {/* Image */}
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', duration: 0.5, delay: 0.15 }}
          className='flex-grow flex-col items-stretch justify-center sm:flex hidden'>
          <img src='/undraw_audio_player_re_cl20.svg' layout='fill' className='flex-grow max-h-[66vh] min-w-[30vw]' />
        </motion.div>
      </section>


      {/* LEARN MORE */}
      <section className='sm:py-24 py-10 flex md:flex-row flex-col items-center justify-between
      z-10 md:text-start text-center xl:px-44 sm:px-12 px-2' ref={learnSectionRef}>
        {/* Left column (text) */}
        <div className='md:w-1/2 my-12'>
          <h1 className='text-4xl'>
            How does this work?
          </h1>

          {/* Cards */}
          <div className='flex flex-wrap md:justify-start justify-center gap-4 my-14'>
            <div className='w-32 h-32 bg-slate-800 text-slate-100 flex flex-col
            text-center items-center justify-center gap-y-4 rounded-xl'>
              <BsSpotify size={48} />
              <p>Spotify API</p>
            </div>
            <div className='w-32 h-32 bg-slate-800 text-slate-100 flex flex-col
            text-center items-center justify-center gap-y-4 rounded-xl'>
              <FaSlidersH size={48} />
              <p>Customize</p>
            </div>
            <div className='w-32 h-32 bg-slate-800 text-slate-100 flex flex-col
            text-center items-center justify-center gap-y-4 rounded-xl'>
              <TbFreeRights size={48} />
              <p>Free to use</p>
            </div>
          </div>


          <span className='text-xl'>
            You just have to pick a genre and modify the settings
            to match your taste. The alghorithms will do the rest!
          </span>
        </div>
        {/* Right column (album covers) */}
        <div className='grid w-fit h-fit grid-cols-2'>
          <Image src='/albums/the_scotts.jpg' width={164} height={164} layout='fixed' priority />
          <Image src='/albums/madvillian.jpg' width={164} height={164} layout='fixed' priority />
          <Image src='/albums/faces.jpg' width={164} height={164} layout='fixed' priority />
          <Image src='/albums/post_malone.jpg' width={164} height={164} layout='fixed' priority />
        </div>
      </section>

      {/* Circles */}
      <div className='fixed z-0'>
        <div className='fixed -bottom-24 -left-14 w-80 h-80 bg-slate-700 bg-opacity-20 rounded-full' />
        <div className='fixed top-24 left-96 w-64 h-64 bg-slate-700 bg-opacity-20 rounded-full' />
        <div className='fixed bottom-2 right-4 w-96 h-96 bg-slate-700 bg-opacity-20 rounded-full' />
      </div>
    </div>
  )
}
