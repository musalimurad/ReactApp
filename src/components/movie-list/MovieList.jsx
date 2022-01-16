import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./movie-list.scss";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../movie-card/MovieCard";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import tmdbApi, { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

const MovieList = (props) => {
  const [itemMovie, setItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
        const params = {page:3}
        try {
            const response = await tmdbApi.getMovieList(props.type, {params});
            setItems(response.results.slice(0,50));
        }catch{
            console.log('error')
        }
        

    }
    
    getMovies();
  }, [])

  return(
    
   <div className="movie-list">
       <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
           {
               
            itemMovie.map((itemMovie, i) => (
                <SwiperSlide key={i}>
               <MovieCard item={itemMovie} category={props.category} />
            </SwiperSlide>
            ))
            
           }
       </Swiper>
  </div>
  );  
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieList;
