import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect, useContext } from 'react'
import Navbar from '../components/shared/layout/Navbar'
import styles from '../styles/Home.module.css'
import { BsSpotify } from 'react-icons/bs';
import { AuthContext } from '../context/auth-context'

const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

export default function Home() {

  const { token, setToken } = useContext(AuthContext);

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
  }, []);

  return (
    <div className='h-screen flex flex-col text-zinc-50'>
      <Navbar />
      <section className='xl:px-44 sm:px-12 flex flex-grow items-stretch justify-center m-auto gap-x-36 z-10'>

        {/* Call To Action */}
        <div className='flex flex-col gap-y-2 sm:items-start items-center self-center sm:text-start text-center'>
          <h1 className='font-semibold lg:text-7xl text-5xl'>Rediscover your<br /> taste</h1>
          <span className='text-2xl mb-8'>Your new favorite song is just a few clicks away!</span>

          {/* Actions */}
          <div className='flex md:flex-row flex-col items-stretch gap-2'>

            <a
              href={`${AUTH_ENDPOINT}?client_id=${process.env.SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
              className='flex items-center gap-x-3 bg-slate-700 p-4 rounded-lg lg:text-xl text-lg'>
              <BsSpotify />
              Login with Spotify
            </a>
            <button
              onClick={() => console.log(process.env.TEST)}
              className='bg-slate-700 p-4 rounded-lg lg:text-xl text-lg'>Learn More</button>

          </div>
        </div>
        {/* Image */}
        <div className='flex-grow flex-col items-stretch justify-center sm:flex hidden'>
          {/* <div className='bg-landing-page flex-grow max-h-[86vh] min-w-[20vw]
          bg-contain bg-no-repeat bg-left-bottom'></div> */}
          <img src='/undraw_audio_player_re_cl20.svg' layout='fill' className='flex-grow max-h-[66vh] min-w-[30vw]' />
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
