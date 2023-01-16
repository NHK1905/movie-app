import axiosClient from "./axiosClient";

export const category = {
    movie: 'movie',
    tv: 'tv'
}

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated'
}

export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air'
}

const tmdbApi = {
    getMoviesList: (type, params) => {
        const url = 'movie/' + movieType[type];
        return axiosClient.get(url, params);
    },
    getTVList: (type, params) => {
        const url = 'tv/' + tvType[type];
        return axiosClient.get(url, params);
    },
    getVideos: (cate, movie_id) => {
        const url = category[cate] + '/' + movie_id + '/' + 'videos';
        return axiosClient.get(url, {params: {}});
    },
    search: (cate, params) => {
        const url = 'search/' + category[cate];
        return axiosClient.get(url, params);
    },
    detail: (cate, movie_id, params) => {
        const url = category[cate] + '/' + movie_id;
        return axiosClient.get(url, params);
    },
    credits: (cate, movie_id) => {
        const url = category[cate] + '/' + movie_id + '/credits';
        return axiosClient.get(url, {params: {}});
    },
    similar: (cate, movie_id) => {
        const url = category[cate] + '/' + movie_id + '/similar';
        return axiosClient.get(url, {params: {}});
    },
}

export default tmdbApi;