import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';



// const isMovieTrue = props.movie.id === `${movieId}`







// Uncomment this only when you have moved on to the stretch goals
// const saveMovie = () => {
//   const addToSavedList = props.addToSavedList;
//   addToSavedList(movie)
// }







const Movie = (props) => {
  const { movieId } = useParams()

  const [movie, setMovie] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${movieId}`)
      .then(response => {
        setMovie(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }, [movieId]);
  const { title, director, metascore, stars } = movie;

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>
      <div className="save-button">Save</div>
    </div>
  );
}

export default Movie;
