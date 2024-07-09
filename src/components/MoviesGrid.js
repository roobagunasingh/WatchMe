import React, { useEffect, useState } from "react";
import MovieCard from './MovieCard';
import '../styles.css';

export default function MoviesGrid(){

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

        useEffect(() => {
            fetch("movies.json")
            .then(response => response.json())
            .then(data => setMovies(data))
        }, []);

        const handleSearchChange = (e) => {
            setSearchTerm(e.target.value); 
        }

        const filteredMovies = movies.filter((movie) =>  
            movie.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        )

        return (
              <div>
                <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Search Movies..." 
                        value={searchTerm}
                        onChange = {handleSearchChange}/>
                    <div className="movies-grid">
                    { 
                    filteredMovies.map((movie) => (
                        <MovieCard movie= {movie} key={movie.id}></MovieCard>
                    ))
                    }
                    </div>
                </div>
        );
}