import React, { useEffect } from "react";
import Profile from "./Profile";
import NavBar from "./NavBar";
import Row from "./Row";
import Banner from "./Banner";
import requests from "./requests";
import { useStateValue } from "./StateProvider";

function Home() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="Home">
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
    </div>
  );
}

export default Home;
