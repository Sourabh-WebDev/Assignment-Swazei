import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MoviesSearch } from '../store/Slices/MovieSlice';
import { Pagination } from './Pagination';
import { ClipLoader } from 'react-spinners'

const MovieSearch = () => {

    // api search query 

    const dispatch = useDispatch()
    const data = useSelector(state => state.movie.data)
    const loading = useSelector(state => state.movie.isLoading)

    // search state

    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1)

    // hooks for search query

    useEffect(() => {
        setPage(1)
        dispatch(MoviesSearch(query, page))
    }, [query, page, dispatch])

    return (
        <div className='flex flex-col items-center gap-3 w-full'>
            <div className='p-2 md:p-5 w-full'>
                <input type="text" className='md:w-full p-2 md:p-4 rounded-lg ' placeholder='search Movie' value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            {!loading ?
                <div className='md:grid md:grid-cols-2 md:gap-4'>
                    {data?.results?.map((movie) => (
                        <div key={movie.id} className='flex flex-col md:flex-row bg-white gap-4 rounded-lg p-5 m-2 md:m-0'>
                            <img
                                className='rounded-lg w-full md:w-44 h-64'
                                src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                                alt={movie.original_name}
                            />
                            <div className='text-left md:border-l-2 p-1'>
                                <h3 className='text-lg md:text-2xl font-bold'>{movie?.original_name || 'NA'}</h3>
                                <p>{movie?.overview || 'NA'}</p>
                            </div>
                        </div>

                    ))}
                </div>
                : <ClipLoader color="#36d7b7" />}
            <Pagination currentPage={data?.page} totalPage={data?.total_pages} onPageChange={setPage} />
        </div>
    )
}

export default MovieSearch