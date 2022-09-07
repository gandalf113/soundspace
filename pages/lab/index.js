import axios from 'axios';
import React, { useContext, useState } from 'react'
import Image from 'next/image';
import { AuthContext } from '../../context/auth-context';

const MusicLab = () => {
  const { token } = useContext(AuthContext);

  const [albums, setAlbums] = useState();

  const fetchAlbums = async () => {
    const { data } = await axios.get("https://api.spotify.com/v1/recommendations?seed_artists=4LLpKhyESsyAXpc4laK94U&seed_genres=hip-hop&seed_tracks=6iebahDm4PUe5e7zg4EeMX",
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": 'application/json'
        }
      })

    setAlbums(data.tracks)
    console.log(data);
  }

  return (
    <div className='flex'>
      {/* Sidebar */}
      <div className='fixed flex flex-col justify-end w-1/4 bg-primary h-screen'>
        {token &&
          <button onClick={fetchAlbums} className='bg-red-400 p-4'>Recommend</button>
        }
      </div>

      <main className='absolute right-0 p-4 w-3/4'>
        <div className='flex flex-col gap-y-4'>
        {albums && albums.map(album => (
          <div className='flex gap-x-2'>
            <Image src={album.album.images[0].url} width={80} height={80}/>
            <a href={album.external_urls.spotify} target='_blank' className='text-white text-xl'>{album.name}</a>
          </div>
        ))}
        </div>
      </main>
    </div >
  )
}

export default MusicLab