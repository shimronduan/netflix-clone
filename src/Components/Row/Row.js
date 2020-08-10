import React, { useState, useEffect } from "react";
import axios from "../..//Services/axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const img_base_url = "https://image.tmdb.org/t/p/original/";

const Row = (props) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    axios.get(props.fetchUrl).then((response) => {
      setMovies(response.data.results);
    });
  }, [props.fetchUrl]);

  const opts = {
    height: "300",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const clickHandler = (movie) => {
    debugger;
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title)
        .then((url) => {
          debugger;
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => {
          debugger;

          console.log(err);
        });
    }
  };
  return (
    <div className="row">
      {/* TITLE */}
      <h2>{props.title}</h2>

      {/* POSTERS */}
      <div className="row_posters">
        {movies.map((movie) => {
          if (movie.poster_path != null && movie.backdrop_path != null) {
            return (
              <img
                className={`row_poster ${
                  props.isLargeRow && "row_posterLarge"
                }`}
                src={`${img_base_url}${
                  props.isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                key={movie.id}
                onClick={() => clickHandler(movie)}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
