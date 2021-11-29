import React from "react";
import styled from "styled-components";

const MovieContainer=styled.div`
    display:flex;

`;

const MoviComponent=(props) =>{
    const {Title, Year, imdbID, Type, Poster}=props.movi;

    return(
        <MovieContainer onClick={() =>{
            props.onMoviSelect(imdbID);
            window.scrollTo({top: 0, behavior: "smooth"});
        }}
        >
            <CoverImage src={Poster} alt={Title}/>
            <MoviName>{Title}</MoviName>
            <InfoColumn>
                <MoviInfo>Year : {Year}</MoviInfo>
                <MoviInfo>Type : {Type}</MoviInfo>
            </InfoColumn>
        </MovieContainer>
    );
};
export default MoviComponent;