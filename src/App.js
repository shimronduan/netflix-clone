import React from "react";
import "./App.css";
import Row from "./Components/Row/Row";
import requests from "./Services/requests";
import Banner from "./Components/Banner/Banner";
import Nav from "./Components/Nav/Nav";
function App() {
  return (
    <div className="app">
      {/* NAV */}
      <Nav />
      {/* BANNER */}
      <Banner />

      {/* ROWS */}
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
