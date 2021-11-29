import { useEffect, useState } from "react"
// import { Container } from "reactstrap";
import Axios from "axios";
import { API_KEY } from "../App";
// import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 350px;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.5;
  }
`;
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
`;

const MovieInfoComponent=(props) =>{
    const [moviInfo, setMoviInfo]=useState();
    const {selectedMovi}=props;

    useEffect(() =>{
        Axios.get(
            'http://www.omdbapi.com/?i={selectedMovi}&apikey=${API_KEY}',
        ).then((response) => setMoviInfo(response.data));
    }, [selectedMovi]);

    return(
        <Container>
            {moviInfo ? (
                <>
                    <CoverImage src={moviInfo?.Poster} alt={moviInfo.Title} />
                    <InfoColumn>
                        <MoviName>
                            {moviInfo?.Type}: <span>{moviInfo?.Title}</span>
                        </MoviName>

                        <MoviInfo>
                            IMBD Rating:<span>{moviInfo?.imdbRating}</span>
                        </MoviInfo>

                        <MoviInfo>
                            Year:<span>{moviInfo?.Year}</span>
                        </MoviInfo>

                        <MoviInfo>
                            Language:<span>{moviInfo?.Language}</span>
                        </MoviInfo>

                        <MoviInfo>
                            Rated:<span>{moviInfo?.Rated}</span>
                        </MoviInfo>

                        <MoviInfo>
                            Director:<span>{moviInfo?.Director}</span>
                        </MoviInfo>

                        <MoviInfo>
                            Actors:<span>{moviInfo?.Actors}</span>
                        </MoviInfo>

                        <MoviInfo>
                            Genre:<span>{moviInfo?.Genre}</span>
                        </MoviInfo>

                    </InfoColumn>
                    <close onClick={() => props.onMovieSelect()}>Colose</close>
                </>
            ) : (
                "Loading..."
            )}
        </Container>
    );
};
export default MovieInfoComponent;