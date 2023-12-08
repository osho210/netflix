import React from 'react';
import './App.css';
import {requests} from './api/requests';
import { Row } from './components/Row';
import { Banner } from './components/Banner';

function App() {
  return (
    <div className="App">
      <Banner />
      <Row title='top Rated' fetchUrl={requests.fetchTopRated} />
      <Row title='Action Movies' fetchUrl={requests.fetchComedyMovies} />
      <Row title='Comedy Movies' fetchUrl={requests.fetchDocumentaries} />
      <Row title='Horror Movies' fetchUrl={requests.fetchRomanceMovies} />
    </div>
  );
}

export default App;
