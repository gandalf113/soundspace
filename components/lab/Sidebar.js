import Link from 'next/link';
import React from 'react'
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

const toTitleCase = (str) => {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}


const Sidebar = ({ genre, setGenre, inputs, handleSetInputs, handleFetch }) => {
    return (
        <div className='md:fixed md:w-2/6 w-full flex flex-col justify-between
        bg-slate-700 md:h-screen p-8 overflow-y-auto'>
            <div className='flex flex-col text-white gap-y-4'>
                <h4 className='text-2xl flex items-center gap-x-1 mb-4'>Powered by <BsSpotify className='ml-2' /> Spotify</h4>
                {/* Genre */}
                <div className='grid grid-cols-3 gap-x-5'>
                    <label htmlFor='genres'>Genre</label>
                    <select id='genres' className='px-1 bg-slate-600 text-slate-200 rounded-md col-span-2'
                        onChange={(e) => setGenre(e.target.value)} value={genre}>
                        {GENRES.map(genre => (
                            <option key={genre}>{genre}</option>
                        ))}
                    </select>
                </div>
                {/* Range sliders */}
                {inputs.map(input => (
                    <div key={input.id} className='grid grid-cols-3 gap-x-5'>
                        <label htmlFor={`${input.id}-range`} className="truncate">{toTitleCase(input.id)}</label>
                        <input id={`${input.id}-range`} type="range" min={input.min} max={input.max} step={input.step}
                            onChange={e => handleSetInputs(input.id, e.target.value)} value={input.value}
                            className="w-full h-2 bg-slate-600 accent-slate-500 rounded-lg
        appearance-none none cursor-pointer col-span-2 self-center"/>
                    </div>
                ))}
            </div>

            <div className='flex flex-col gap-y-2'>
                <button onClick={handleFetch} className='bg-slate-500 text-white shadow rounded-lg p-4 mt-6'>Find Songs</button>
                <Link href='/'>
                    <p className='text-center text-slate-400 cursor-pointer'>Back to home page</p>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar