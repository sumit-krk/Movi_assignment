import MovieComponent from './components/MoviComponent';
import MovieInfoComponent from './components/InformationCom';
import styled from "styled-components";
import {Axios} from "axios";
import { useState } from 'react';
import { Container } from 'reactstrap';
import Header from '../../../practice/src/components/Header/Header';
import MoviComponent from './components/MoviComponent';

export const API_KEY = "feeafc94";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

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
