import React, { useState, useEffect, useRef } from "react";
import "./Row.css";
import axios from "./axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const ref = useRef();
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  const opts = {
    height: "450",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(isLargeRow ? movie?.original_name : movie?.original_title)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <motion.div className="row" layout>
      <h2>{title}</h2>
      <motion.div className="row__posters">
        {movies.map((movie) => (
          <Tilt
            ref={ref}
            options={{ reverse: true, easing: "cubic-bezier(.03,.98,.52,.99)" }}
            className="tilt__posters"
          >
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row__poster ${isLargeRow && "row__netflix"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={isLargeRow ? movie.original_name : movie.original_title}
            />
            <h2 className="row__posterOverlay">
              {isLargeRow ? movie.original_name : movie.original_title}
            </h2>
          </Tilt>
        ))}
      </motion.div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </motion.div>
  );
}

export default Row;
