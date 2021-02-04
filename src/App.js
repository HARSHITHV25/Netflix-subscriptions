import React from 'react';
import './App.css';
import Row from './Row';
import requests from './requests'
import Banner from './Banner';
import NavBar from './NavBar';

function App() {
  return (
    <div className="app">
      <NavBar />
      <Banner />
      <Row title='Netflix Originals' isLargeRow fetchUrl={requests.fetchNetflixOriginals} />
      <Row title='Animated' fetchUrl={requests.fetchAnimated} />
      <Row title='Actions Movies' fetchUrl={requests.fetchActionMovies} />
      <Row title='Horror Movies' fetchUrl={requests.fetchHorrorMovies} />
      <Row title='Comedy Movies' fetchUrl={requests.fetchComedyMovies} />
      <Row title='Trending Now' fetchUrl={requests.fetchTrending} />
    </div>
  );
}

export default App;