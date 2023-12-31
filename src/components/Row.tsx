import { useState, useEffect } from 'react';
import instance from '../api/axios';
import '../Styles/global.scss';
import YouTube from 'react-youtube';
const base_url = "https://image.tmdb.org/t/p/original";
const API_KEY="881d6fc53403b06b145a5c516fae3949"

type Props = {
    title: string;
    fetchUrl: string;
    isLargeRow?: boolean;
};

type Movie = {
    id: number;
    name: string;
    title: string;
    original_name: string;
    poster_path: string;
    backdrop_path: string;
};

type Options = {
    height: string;
    width: string;
    playerVars: {
        autoplay: 0 | 1 | undefined;
    };
};

export const Row = ({title, fetchUrl, isLargeRow}: Props) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [trailerUrl, setTrailerUrl] = useState<string | null>("");

    useEffect(() => {
        async function fetchData() {
            const request = await instance.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts: Options = {
        height: "390",
        width: "640px",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = async (movie: Movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            let trailerurl = await instance.get(
                `/movie/${movie.id}/videos?api_key=${API_KEY}`
            );
            setTrailerUrl(trailerurl.data.results[0]?.key);
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row-posters">
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        className={`row-poster ${isLargeRow && "row-posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                        onClick={() => handleClick(movie)}
                    />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            {/* container -> posters */}
        </div>
    );
}