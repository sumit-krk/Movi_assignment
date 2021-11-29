import { useEffect, useState } from "react"
// import { Container } from "reactstrap";
import Axios from "axios";
import { API_KEY } from "../App";
// import styled from "styled-components"

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