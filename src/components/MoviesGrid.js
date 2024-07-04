import React, { useEffect, useState } from "react";
import MovieCard from './MovieCard';
import '../styles.css';

export default function MoviesGrid(){

    const [movies, setMovies] = useState([]);

        useEffect(() => {
            fetch("movies.json")
            .then(response => response.json())
            .then(data => setMovies(data))
        }, []);

        return (
              <div className="movies-grid">
                { 
                movies.map((movie) => (
                    <MovieCard movie= {movie} key={movie.id}></MovieCard>
                ))
                }
                </div>
        );
}