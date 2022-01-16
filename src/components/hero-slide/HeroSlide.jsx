import React, { useState, useEffect, useRef } from 'react';
// import { useHistory } from 'react-router-dom';
import Button, {OutlineButton} from '../button/Button';

import tmdbApi, {category, movieType} from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import SwiperCore, {Autoplay} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Modal, {ModalContent} from '../../components/modal/Modal';


import './hero-slide.scss';
const HeroSlide = () => {

    SwiperCore.use([Autoplay]);

    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
         const getMovies = async () => {
             const params = {page:1}
             try {
                 const response = await tmdbApi.getMovieList(movieType.popular, {params});
                 setMovieItems(response.results.slice(0,20));
             }catch{
                 console.log('error');
             }
             

         }
         getMovies();
    }, [])
    return (
        <div className='hero-slide'>
            <Swiper
                modules = {[Autoplay]}
                grabCursor = {true}
                spaceBetween = {0}
                slidesPerView={1}
                autoplay = {{delay:3000}}
            >
              {
                  movieItems.map((item,i)=> (
                      <SwiperSlide key={i}>
                          {({isActive}) =>(
                              <HeroSlideItem item={item} className={`${isActive? 'active': ''}`}/>
                          )}
                      </SwiperSlide>
                  ))
              }

            </Swiper>
            {
                movieItems.map((item, i)=> <TrailerModal key={i} item={item}  />)
            }
        </div>
    )
}

const HeroSlideItem = props => {


    const item = props.item;
    // let hisrory = useHistory();
    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);

        const videos = await tmdbApi.getVideos(category.movie, item.id);

        if(videos.results.length > 0){
            const vidSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal.querySelector('.modal__content > iframe').setAttribute('src', vidSrc);
        } else{
            modal.querySelector('.modal__content').innerHTML = 'No Trailer';
        }
        modal.classList.toggle('active');
    }

    return(
        <div className={`hero-slide__item ${props.className}`} style={{backgroundImage:`url(${background})`}}>
            <div className='hero-slide__item__content container'>
                <div className='hero-slide__item__content__info'>
                    <h2 className='title'>{item.title}</h2>
                    <div className='overview'>
                        {item.overview}
                    </div>
                    <div className='btns'>
                      <Button >
                          Watch now
                      </Button>
                      <OutlineButton onClick={setModalActive}>
                          Watch trailer
                      </OutlineButton>
                    </div>
                </div>
                <div className='hero-slide__item__content__poster'>
                    <img src={apiConfig.w500Image(item.poster_path)}/>
                </div>

            </div>
        </div>
    )
    
}

const TrailerModal = props => {
    const item = props.item;

    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute('src', '');

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    )
}

export default HeroSlide;
