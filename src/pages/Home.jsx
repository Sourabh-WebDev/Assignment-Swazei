import React from 'react'
import MovieSearch from '../components/MovieSearch'

const Home = () => {
    return (
        <div className='grid place-items-center max-h-screen md:p-10 '>
            <div className=' bg-indigo-400 py-5 md:p-5 rounded-md w-full text-center'>
                <h1 className='text-2xl md:text-5xl font-extrabold'>Search Movie</h1>
                <MovieSearch />
            </div>
        </div>
    )
}

export default Home