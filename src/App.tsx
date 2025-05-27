import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';

interface MovieType {
  id: number;
  src: string;
  title: string;
  score: number;
}

export default function App() {
  const [movies, setMovies] = useState<MovieType[]>([]);

  
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
    })));
  };

  fetchMovies();
  }, []);


  return (
    <div className='cards'>
      {movies.map((movie) => (
        <Card
          key={movie.id}
          imageSource={movie.src}
          title={movie.title}
          score={movie.score}
        />
      ))}
    </div>
  )
}
