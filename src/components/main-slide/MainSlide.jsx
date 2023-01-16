import React, { useState, useEffect, useRef } from 'react';

import tmdbApi, { category, movieType } from '../../api/tbdbApi';
import apiConfig from '../../api/apiConfig';

import Button, { OutlineButton } from '../button/Button';
import Model, { ModelContent } from '../model/Model'

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import './main-slide.scss';
import { useHistory } from 'react-router-dom';

const MainSlide = () => {

    SwiperCore.use([Autoplay]);

    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = {page: 1}
            const response = await tmdbApi.getMoviesList(movieType.popular, {params});
            setMovieItems(response.results.slice(1, 4));
        }
        getMovies();
    }, []);

    return (
        <div className="main-slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{delay: 3000}}
            >
                {
                    movieItems.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({ isActive }) => (
                                <MainSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {
                movieItems.map((item, i) => <TrailerModel key={i} item={item} />)
            }
        </div>
    );
}

const MainSlideItem = props => {
    let hisrory = useHistory();

    const item = props.item;

    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

    const setModelActive = async () => {
        const model = document.querySelector(`#model_${item.id}`);

        const videos = await tmdbApi.getVideos(category.movie, item.id);

        if (videos.results) {
            const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            model.querySelector('.model__content > iframe').setAttribute('src', videSrc);
        } else {
            model.querySelector('.model__content').innerHTML = 'No Trailer';
        }        

        model.classList.toggle('active');
    }

    return (
        <div 
            className={`main-slide__item ${props.className}`}
            style={{backgroundImage: `url(${background})`}}    
        >
            <div className="main-slide__item__content container">
                <div className="main-slide__item__content__info">
                    <h2 className="title">
                        {item.title}
                    </h2>
                    <div className="overview">
                        {item.overview}
                    </div>
                    <div className="btns">
                    <Button onClick={() => hisrory.push('/movie/' + item.id)}>
                            Watch now
                        </Button>
                        <OutlineButton onClick={setModelActive} >
                            Watch Trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="main-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
            </div>
        </div>
    )
}

const TrailerModel = props => {
    const item = props.item;

    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute('src', '');

    return (
        <Model active={false} id={`model_${item.id}`}>
            <ModelContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer" ></iframe>
            </ModelContent>
        </Model>
    )
}

export default MainSlide