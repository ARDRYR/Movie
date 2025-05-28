import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';

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

  fetchMovies();
  }, []);

  const handleCardClick = (movie: MovieType) => {
    setModal(movie);
  }

  const handleCloseClick = () => {
    setModal(null);
  }

  return (
    <div className='container'>
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
            <img src='?'/>
            <div className='modal-infomation'>
              <span className='modal-title'>{modal.title}</span>
              
            </div>
            <button onClick={handleCloseClick}>X</button>
          </div>
        </div>
      )}
    </div>
  )
}
