import MovieComponent from './components/MoviComponent';
import MovieInfoComponent from './components/InformationCom';
import styled from "styled-components";
import {Axios} from "axios";
import { useState } from 'react';
import { Container } from 'reactstrap';
import Header from '../../../practice/src/components/Header/Header';
import MoviComponent from './components/MoviComponent';

export const API_KEY = "feeafc94";


function App() {
  const [searchQuery, updateSearchQuery]=useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response=await Axios.get(
      'http://www.omdbapi.com/?s={searchString}&apikey=${API_KEY}',
    );
    updateMovieList(response.data.Search);
  };
  const onTextChange=(e) =>{
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return(
    <Container>
      <Header>
        <AppName>
          <MovieImage />React Movi App
        </AppName>
        <SearchBox>
          <SearchIcon src="/react-movi-app/search-icon.svg" />
          <SearchInput placeholder="search movi" value={searchQuery} onChange={onTextChange} />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect} />}
      <MoviListContainer>
        {movieList?.length ?(
          movieList.map((movi, index) =>(
            <MoviComponent key={index} movie={movie} onMovieSelect={onMovieSelect} />
          ))
        ):(
          <Placeholder src="/react-movi-app/movie-icon.svg" />
        )}
      </MoviListContainer>
    </Container>
  );
}

export default App;
