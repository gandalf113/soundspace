import axios from 'axios';
import React, { useContext, useState } from 'react'
import Image from 'next/image';
import { AuthContext } from '../../context/auth-context';
import { BsSpotify } from 'react-icons/bs';

const GENRES = [
  "acoustic",
  "afrobeat",
  "alt-rock",
  "alternative",
  "ambient",
  "anime",
  "black-metal",
  "bluegrass",
  "blues",
  "bossanova",
  "brazil",
  "breakbeat",
  "british",
  "cantopop",
  "chicago-house",
  "children",
  "chill",
  "classical",
  "club",
  "comedy",
  "country",
  "dance",
  "dancehall",
  "death-metal",
  "deep-house",
  "detroit-techno",
  "disco",
  "disney",
  "drum-and-bass",
  "dub",
  "dubstep",
  "edm",
  "electro",
  "electronic",
  "emo",
  "folk",
  "forro",
  "french",
  "funk",
  "garage",
  "german",
  "gospel",
  "goth",
  "grindcore",
  "groove",
  "grunge",
  "guitar",
  "happy",
  "hard-rock",
  "hardcore",
  "hardstyle",
  "heavy-metal",
  "hip-hop",
  "holidays",
  "honky-tonk",
  "house",
  "idm",
  "indian",
  "indie",
  "indie-pop",
  "industrial",
  "iranian",
  "j-dance",
  "j-idol",
  "j-pop",
  "j-rock",
  "jazz",
  "k-pop",
  "kids",
  "latin",
  "latino",
  "malay",
  "mandopop",
  "metal",
  "metal-misc",
  "metalcore",
  "minimal-techno",
  "movies",
  "mpb",
  "new-age",
  "new-release",
  "opera",
  "pagode",
  "party",
  "philippines-opm",
  "piano",
  "pop",
  "pop-film",
  "post-dubstep",
  "power-pop",
  "progressive-house",
  "psych-rock",
  "punk",
  "punk-rock",
  "r-n-b",
  "rainy-day",
  "reggae",
  "reggaeton",
  "road-trip",
  "rock",
  "rock-n-roll",
  "rockabilly",
  "romance",
  "sad",
  "salsa",
  "samba",
  "sertanejo",
  "show-tunes",
  "singer-songwriter",
  "ska",
  "sleep",
  "songwriter",
  "soul",
  "soundtracks",
  "spanish",
  "study",
  "summer",
  "swedish",
  "synth-pop",
  "tango",
  "techno",
  "trance",
  "trip-hop",
  "turkish",
  "work-out",
  "world-music"
]


const MusicLab = () => {
  const { token } = useContext(AuthContext);

  const [genre, setGenre] = useState('guitar');
  const [authorSeed, setAuthorSeed] = useState('4LLpKhyESsyAXpc4laK94U');

  const [acousticness, setAcousticness] = useState(0.5);
  const [danceability, setDanceability] = useState(0.5);
  const [energy, setEnergy] = useState(0.5);

  const [albums, setAlbums] = useState();

  const fetchAlbums = async () => {
    // const uri = `https://api.spotify.com/v1/recommendations?seed_artists=${authorSeed}&seed_genres=${genre}&target_acousticness=${acousticness}`
    const uri = `https://api.spotify.com/v1/recommendations`

    console.log(uri)
    const { data } = await axios.get(uri,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": 'application/json'
        },
        params: {
          seed_artists: authorSeed,
          seed_genres: genre,
          target_acousticness: acousticness,
          target_danceability: danceability
        }
      })

    setAlbums(data.tracks)
    console.log(data);
  }

  return (
    <div className='flex'>
      {/* Sidebar */}
      <div className='fixed flex flex-col justify-between w-1/4 bg-slate-700 h-screen p-8'>
        <div className='flex flex-col text-white gap-y-4'>
          <h4 className='text-2xl flex items-center gap-x-1 mb-4'>Powered by <BsSpotify className='ml-2' /> Spotify</h4>
          {/* Artist */}
          {/* <div className='grid grid-cols-3 gap-x-5'>
            <label htmlFor='author'>Artist: </label>
            <input id='author' type='text' className='px-1 bg-slate-600 text-slate-200 rounded-md col-span-2'
              onChange={(e) => setAuthorSeed(e.target.value)} />
          </div> */}
          {/* Genre */}
          <div className='grid grid-cols-3 gap-x-5'>
            <label htmlFor='genres'>Genre: </label>
            <select id='genres' className='px-1 bg-slate-600 text-slate-200 rounded-md col-span-2'
              onChange={(e) => setGenre(e.target.value)}>
              {GENRES.map(genre => (
                <option key={genre}>{genre}</option>
              ))}
            </select>
          </div>

          {/* Acousticness  */}
          <div className='grid grid-cols-3 gap-x-5'>
            <label htmlFor="acousticness-range" className="">Acousticness</label>
            <input id="acousticness-range" type="range" min={0} max={1} step={0.1}
              onChange={e => setAcousticness(e.target.value)} value={acousticness}
              className="w-full h-2 bg-slate-600 accent-slate-500 rounded-lg
            appearance-none none cursor-pointer col-span-2 self-center"/>
          </div>
          {/* Danceability */}
          <div className='grid grid-cols-3 gap-x-5'>
            <label htmlFor="danceability-range" className="">Danceability</label>
            <input id="danceability-range" type="range" min={0} max={1} step={0.1}
              onChange={e => setDanceability(e.target.value)} value={danceability}
              className="w-full h-2 bg-slate-600 accent-slate-500 rounded-lg
            appearance-none none cursor-pointer col-span-2 self-center"/>
          </div>
          {/* Energy */}
          <div className='grid grid-cols-3 gap-x-5'>
            <label htmlFor="energy-range" className="">Energy</label>
            <input id="energy-range" type="range" min={0} max={1} step={0.1}
              onChange={e => setEnergy(e.target.value)} value={energy}
              className="w-full h-2 bg-slate-600 accent-slate-500 rounded-lg
            appearance-none none cursor-pointer col-span-2 self-center"/>
          </div>
        </div>
        {token &&
          <button onClick={fetchAlbums} className='bg-slate-500 text-white shadow rounded-lg p-4'>Find Songs</button>
        }
      </div>

      <main className='absolute right-0 p-4 w-3/4'>
        <div className='flex flex-col gap-y-4'>
          {albums && albums.map(album => (
            <div key={album.id} className='flex gap-x-2'>
              <Image src={album.album.images[0].url} width={80} height={80} />
              <div className='flex flex-col text-white'>
                <a href={album.external_urls.spotify} target='_blank' className='h-fit text-xl hover:underline'>
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
          ))}
        </div>
      </main>
    </div >
  )
}

export default MusicLab