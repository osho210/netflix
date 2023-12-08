import instance from '../api/axios';
import { useEffect, useState } from 'react';
import { requests } from '../api/requests';


type movieProps = {
    title?: string;
    name?: string;
    original_name?: string;
    backdrop_path?: string;
    overview?: string;
}

export const Banner = () => {
    const [movie, setMovie] = useState<movieProps>({});
    useEffect(() => {
        async function fetchData() {
            const request = await instance.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
            return request;
        }
        fetchData();
    }, []);
    console.log(movie);

    function truncate(str: any, n: number) {
        return str?.length! > n ? str?.substr(0, n - 1) + '...' : str;
    }
    return (
        <header className='banner' style={{
            backgroundSize: 'cover',
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundPosition: 'center center'
        }}>
            <div className='banner-contents'>
                <h1 className='banner-title'>{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className='banner-buttons'>
                    <button className='banner-button'>Play</button>
                    <button className='banner-button'>My List</button>
                </div>
                <h1 className='banner-description'>{truncate(movie?.overview, 150)}</h1>
            </div>
            <div className='banner-fadeBottom' />
        </header>
    )
}