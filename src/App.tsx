import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import { useSuspenseQuery } from '@tanstack/react-query';

interface MovieType {
  id: number;
  src: string;
  title: string;
  score: number;
  overview: string;
  releaseData: string;
}

export default function App() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [modal, setModal] = useState<MovieType | null>(null);

  /*
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',{
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      }
    })
    const data = await response.json();
    setMovies(data.results.map((movie: any) => ({
      id: movie.id,
      src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      title: movie.title,
      score: movie.vote_average,
      overview: movie.overview,
      releaseData: movie.release_date,
    })));
  };
*/

const { data } = useSuspenseQuery<MovieType[], Error, MovieType[]>({
  queryKey: ['movieKey'],
  queryFn: async () => {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    })
    
    if (!response.ok) throw new Error('네트워크 오류 발생')
      const data = await response.json();
    const result = data.results.map((movie: any) => ({
      id: movie.id,
      src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      title: movie.title,
      score: movie.vote_average,
      overview: movie.overview,
      releaseData: movie.release_date,
    }));
    return result
  }
})

useEffect(() => {
  setMovies(data)
}, [data])

  const handleCardClick = (movie: MovieType) => {
    setModal(movie);
  }

  const handleCloseClick = () => {
    setModal(null);
  }

  return (
    <div className='container'>
      <header>
        <span className='header-title'>Movie List</span>
      </header>
      <div className='cards'>
        {movies.map((movie) => (
          <button
            key={movie.id}
            onClick={() => handleCardClick(movie)}
          >
            <Card
              imageSource={movie.src}
              title={movie.title}
              score={movie.score}
            />
          </button>
        ))}
      </div>
      {modal && (
        <div className='modal-background'>
          <div className='modal'>
            <img className='modal-image' src={modal.src}/>
            <div className='modal-infomation'>
              <span className='modal-title'>{modal.title}</span>
              <div className='modal-releaseDateCover'>
                <span className='modal-releaseDateText'>개봉일: </span>
                <span className='modal-releaseDate'>{modal.releaseData}</span>
              </div>
              <div>
                <span className='modal-scoreText'>평점: ⭐ </span>
                <span className='modal-score'>{modal.score.toFixed(1)}</span>
              </div>
              <div>
                <span className='modal-overviewText'>줄거리: </span>
                <span className='modal-overview'>{modal.overview}</span>
              </div>
            </div>
            <button className='modal-closeButton' onClick={handleCloseClick}>X</button>
          </div>
        </div>
      )}
    </div>
  )
}
