import React, { useEffect, useState } from "react";
import MovieCard from './MovieCard';
import '../styles.css';

export default function MoviesGrid(){

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [genre, setGenre] = useState("All Genres");
    const [rating, setRating] = useState("All");

        useEffect(() => {
            fetch("movies.json")
            .then(response => response.json())
            .then(data => setMovies(data))
        }, []);

        const handleSearchChange = (e) => {
            setSearchTerm(e.target.value); 
        };

        const handleGenreChange = (e) => {
            setGenre(e.target.value);
        };

        const handleRatingChange = (e) => {
            setRating(e.target.value);
        };

        const matchesGenres = (movie, genre) => {
            return genre === "All Genres" || movie.genre.toLocaleLowerCase() === genre.toLocaleLowerCase();
        };
        
        const matchesRating = (movie, rating) => {
            switch(rating){
                case 'All':
                    return true;
                case 'Good':
                    return movie.rating >= 8;
                case 'Ok':
                    return movie.rating >= 5 && movie.rating < 8;
                case 'Bad':
                    return movie.rating < 5;
                default:
                    return false;
            }
        };

        const matchesSearchTerm = (movie, searchTerm) => {
            return movie.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
        };

        const filteredMovies = movies.filter(
            (movie) =>  
                matchesGenres(movie, genre) &&
                matchesRating(movie, rating) &&
                matchesSearchTerm(movie, searchTerm)
        );

        return (
              <div>
                <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Search Movies..." 
                        value={searchTerm}
                        onChange = {handleSearchChange}/>
                <div className="filter-bar">
                    <div className="filter-slot">
                        <label>Genre</label>
                        <select className="filter-dropdown" value={genre} onChange={handleGenreChange}>
                            <option>All Genres</option>
                            <option>Comedy</option>
                            <option>Romance</option>
                            <option>Fantasy</option>
                            <option>Drama</option>
                        </select>
                    </div>
                    <div className="filter-slot">
                        <label>Rating</label>
                        <select className="filter-dropdown" value={rating} onChange={handleRatingChange}>
                            <option>All</option>
                            <option>Good</option>
                            <option>Ok</option>
                            <option>Bad</option>
                        </select>
                    </div>
                </div>

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