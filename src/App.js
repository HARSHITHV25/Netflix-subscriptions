import React from "react";
import "./App.css";
import Row from "./Row";
import requests from "./requests";
import Banner from "./Banner";
import NavBar from "./NavBar";
import { motion } from "framer-motion";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import Profile from "./Profile";

function App() {
  const [{ location }, dispatch] = useStateValue();
  return (
    <motion.div className="app" layout>
      {location === "Login" ? (
        <Login />
      ) : (
        <>
          <Profile />
          <NavBar />
          <Banner />
          <Row
            title="Netflix Originals"
            isLargeRow
            fetchUrl={requests.fetchNetflixOriginals}
          />
          <Row title="Animated" fetchUrl={requests.fetchAnimated} />
          <Row title="Actions Movies" fetchUrl={requests.fetchActionMovies} />
          <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
          <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
          <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
        </>
      )}
    </motion.div>
  );
}

export default App;
