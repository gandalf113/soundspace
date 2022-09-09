import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import { AuthContext } from '../../context/auth-context';
import Sidebar from '../../components/lab/Sidebar';
import Head from 'next/head';

const MusicLab = () => {
  const { token } = useContext(AuthContext);
  const router = useRouter();

  // '', 'loading', 'success', 'error'
  const [fetchingState, setFetchingState] = useState('')

  // Target values
  const [genre, setGenre] = useState('acoustic')
  const [inputs, setInputs] = useState([
    {
      id: 'acousticness',
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.1
    },
    {
      id: 'danceability',
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.1
    },
    {
      id: 'energy',
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.1
    },
    {
      id: 'instrumentalness',
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.1
    },
    {
      id: 'key',
      value: 6,
      min: 0,
      max: 11,
      step: 1
    },
    {
      id: 'liveness',
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.1
    },
    {
      id: 'loudness',
      value: -15.125,
      min: -33.4,
      max: 3.15,
      step: 0.1
    },
    {
      id: 'mode',
      value: 1,
      min: 0,
      max: 1,
      step: 1
    },
    {
      id: 'speechiness',
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.1
    },
    {
      id: 'tempo',
      value: 110,
      min: 58,
      max: 220,
      step: 1
    },
  ])

  const handleInputChange = (inputId, value) => {
    const index = inputs.findIndex(input => input.id === inputId);
    const newInputs = [...inputs];
    newInputs[index] = { ...newInputs[index], value: value };

    setInputs(newInputs);
  }

  const findInputElement = (inputId) => {
    return inputs.find(input => input.id === inputId);
  }

  const [albums, setAlbums] = useState();

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [token]);

  const fetchAlbums = async () => {
    const uri = `https://api.spotify.com/v1/recommendations`

    setFetchingState('loading');

    console.log(uri)

    try {
      const { data, status } = await axios.get(uri,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": 'application/json'
          },
          params: {
            seed_genres: genre,
            target_acousticness: findInputElement('acousticness').value,
            target_danceability: findInputElement('danceability').value,
            target_instrumentalness: findInputElement('instrumentalness').value,
            target_key: findInputElement('key').value,
            target_liveness: findInputElement('liveness').value,
            target_loudness: findInputElement('loudness').value,
            target_mode: findInputElement('mode').value,
            target_speechiness: findInputElement('speechiness').value,
            target_tempo: findInputElement('tempo').value,
          }
        })
      if (status === 200) {
        setFetchingState('success')

        setAlbums(data.tracks)
        console.log(data);
      } else {
        setFetchingState('error');
      }
    } catch (error) {
      setFetchingState('error');
    }


  }

  const skeletonArray = Array.apply(null, Array(10))

  return (
    <div className=''>
      <Head>
        <title>Music Lab</title>
        <meta name='description' content='Find new Spotify songs' />
      </Head>
      {/* Sidebar */}
      <Sidebar
        genre={genre} setGenre={setGenre}
        inputs={inputs}
        handleFetch={fetchAlbums}
        handleSetInputs={handleInputChange}
      />
      <main className='md:absolute md:w-4/6 right-0 p-4 '>
        <div className='flex flex-col gap-y-4'>
          {(fetchingState === 'success' && fetchingState !== 'error') ?
            albums && albums.map(album => (
              <div key={album.id} className='flex gap-x-2'>
                <div className='flex-shrink-0'>
                <Image src={album.album.images[0].url} width={80} height={80} layout='fixed'/>
                  </div>
                <div className='flex flex-col text-white'>
                  <a href={album.external_urls.spotify} target='_blank'
                  className='h-fit text-xl hover:underline'>
                    {album.name}
                  </a>
                  <div>
                    {album.artists.map((artist, index) => (
                      <span key={artist.id}>
                        {artist.name}{index < album.artists.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )) :
            // Loading
            fetchingState === 'loading' ?
              <div className='space-y-4'>
                {skeletonArray.map((_, index) => (
                  <div key={index} className='flex gap-x-2'>
                    <div className='w-20 h-20 bg-slate-500 animate-pulse' />
                    <div className='space-y-2'>
                      <div className='w-44 h-4 bg-slate-500 animate-pulse' />
                      <div className='w-36 h-2 bg-slate-500 animate-pulse' />
                    </div>
                  </div>
                ))}
              </div> :
              fetchingState === 'error' &&
              <div className='flex flex-col gap-y-12 items-center justify-center'>
                <img
                  className='w-96 h-96 mt-16'
                  src='/undraw_access_denied_re_awnf.svg' alt="error" />
                <h1 className='text-5xl text-white font-light'>Something went wrong, apologies</h1>
              </div>
          }
        </div>
      </main>
    </div>
  )
}

export default MusicLab