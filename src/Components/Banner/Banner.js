import React, { useState, useEffect } from "react";
import axios from "../../Services/axios";
import requests from "../../Services/requests";
import "./Banner.css";
const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    axios.get(requests.fetchNetflixOriginals).then((response) => {
      setMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length - 1)
        ]
      );
    });
  }, []);
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  if (movie.backdrop_path) {
    return (
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundPosition: "center center",
        }}
      >
        <div className="banner_contents">
          <h1 className="banner_title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner_buttons">
            <button className="banner_button">Play</button>
            <button className="banner_button">My List</button>
          </div>
          <h1 className="banner_description">
            {truncate(movie?.overview, 150)}
          </h1>
        </div>
        <div className="banner--fadebottom"></div>
      </header>
    );
  } else {
    return null;
  }
};

export default Banner;
