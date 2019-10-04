import axios from 'axios';

const API_KEY = '1e2d3e04a46a4b641682a83ebd1b0bf1';
const END_POINT = 'https://api.themoviedb.org';

export const getMovieList = (params) => {

    // const resource  = params.resource ? params.resource : 'movie';
    // page: 1,
    // sort_by: 'release_date.desc',
    // apiName: 'discover',
    // resource: 'movie'
    const apiVersion = params.apiVersion ? params.apiVersion : '3';

    const language  = 'en-US';
    let paramsUrl = '';

    if(params.apiName) { paramsUrl += `/${params.apiName}`; }
    if(params.resource) { paramsUrl += `/${params.resource}`; }
    if(params.id) { paramsUrl += `/${params.id}`; }
    
    paramsUrl += `?api_key=${API_KEY}&language=${language}`;
    
    if(params.sort_by) { paramsUrl += `&sort_by=${params.sort_by}`; }
    if(params.vote_countGTE) { paramsUrl += `&vote_count.gte=${params.vote_countGTE}`; }
    if(params.primary_release_year) { paramsUrl += `&primary_release_year=${params.primary_release_year}`; }
    if(params.page) { paramsUrl += `&page=${params.page}`; }

    const path = `${END_POINT}/${apiVersion}${paramsUrl}`;
    // console.log(path);
    return axios.get(path);
};

export const getConfiguration = () => {
    const END_POINT = 'https://api.themoviedb.org/3';
    const apiName = 'configuration';
    const path = `${END_POINT}/${apiName}?api_key=${API_KEY}`;
    // console.log(path);
    return axios.get(path);

};

export const getListMegaMenu = () => {
    const apiVersion = '3';
    const apiName   = 'genre/movie/list';
    const language  = 'en-US';
    const paramsUrl = `api_key=${API_KEY}&language=${language}`;
    const path = `${END_POINT}/${apiVersion}/${apiName}?${paramsUrl}`;
    return axios.get(path);
}


export const searchMovie = (query) => {
    const apiVersion = '3';
    const apiName   = 'search/movie';
    const language  = 'en-US';
    const paramsUrl = `api_key=${API_KEY}&language=${language}&query=${query}&page=1&include_adult=false`;
    const path = `${END_POINT}/${apiVersion}/${apiName}?${paramsUrl}`;
    return axios.get(path);
}