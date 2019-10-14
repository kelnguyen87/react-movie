import React, {Component} from 'react';
import {getMovieList} from '../../Services';
import {getConfiguration} from '../../Services';
import CardSingle from '../../Product/card-single';
import Loading from '../../Sections/Loading';

export default class LatestTrailer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            videoSingle: [],
            videoList: [],
            videoNowPlaying: [],
            configuration: {
                images: {
                    "base_url": "",
                    "secure_base_url": "",
                    "backdrop_sizes": [
                        "w300",
                        "w780",
                        "w1920",
                        "original"
                    ],
                    "poster_sizes": [
                        "w92",
                        "w154",
                        "w185",
                        "w342",
                        "w500",
                        "w780",
                        "original"
                    ]
                }
            }
           
        };
    }
    
   
    componentDidMount() {
        this._promisAll();
        
    }
    componentDidUpdate(prevProps) {
       
    }

    shouldComponentUpdate(nextProps, nextState) {        
        return this.state !== nextState;
    }
    
    _setSSConfig = (configImages) => {
        sessionStorage.setItem("configImage", JSON.stringify(configImages));
    }

    _getSSConfig = () => {
        const getSSConfig = JSON.parse(sessionStorage.getItem("configImage"));
        return getSSConfig;
    }

    _getNowPlaying = () => {
        const paramsMovieLatest = {
            page: 1,
            apiName: 'movie',
            resource: 'now_playing'
        };
        const getMovieNowPlaying = getMovieList(paramsMovieLatest);
        return getMovieNowPlaying.then(values => {
            return values.data.results.map( (movie, index) =>{
                    return {
                        id: `${movie.id}`,
                        title: `${movie.title}`,
                    };   
                }
            )
           
        });
        
    }

    _getCategory = () => {
        const params = {
            page: 1,
            apiName: 'genre/movie',
            resource: 'list'
        };
        let allCategory=[];
        const  combineCategory = getMovieList(params);
        combineCategory.then(values => {
            values.data.genres.map((result, index)=> {
                    allCategory.push(
                        {id: `${result.id}`,
                        name: `${result.name}`}
                    )
                    
                    return   false;  
                    
                }
            )
           
        });
        return allCategory;
    }

    _promisAll = () => {
        const params = {
            sort_by: 'revenue.desc',
            vote_countGTE: '10',
            apiName: 'discover',
            resource: 'movie'
        };

        //Get config image
        const ssConfig = this._getSSConfig();
        let promiseGetConfig;
        if(ssConfig === null) promiseGetConfig = getConfiguration();
        else promiseGetConfig = ssConfig;
       
        //Get movie List
        const getMovieListPromise = getMovieList(params);
        const combinePromise = Promise.all([promiseGetConfig, getMovieListPromise]);

       
        combinePromise.then(values => {

            const configImages = values[0];
            if(ssConfig === null) {
                this._setSSConfig(configImages);
            }
            const configPathImages = configImages.data.images;
            const configPath = configPathImages.base_url + configPathImages.backdrop_sizes[0] ;
            let imagePath = 'http://placehold.jp/300x169.png';
            
            // Change value videoSingleID
            const totalItem = 9;
            const videoSingleID = 299534;
            
            //Get video Now Playing
            const movielatest = this._getNowPlaying();
            movielatest.then(movie => {
                const mapMovielatest = movie.map( (result, index) => {
                    return result
                        
                })
                this.setState({
                    videoNowPlaying: mapMovielatest,
                });
               
            })
            
            //Get Genres
            //const getGenres = this._getCategory();
            

            const movieList = values[1].data.results.map(
                (function (movie, index) {
                    
                    if(movie.poster_path !== null) {
                        imagePath = configPath + movie.poster_path;
                    }
                    
                    if(index < totalItem && movie.id !== videoSingleID){
                        return {
                            id: `${movie.id}`,
                            title: `${movie.title}`,
                            date: `${movie.release_date}`,
                            desc: `${movie.overview}`,
                            images: `${imagePath}`,
                            vote_average:`${movie.vote_average}`,
                        };    
                    }
                    return false;
                      
                })
            )
            
            const configPathSingle = configPathImages.base_url + configPathImages.backdrop_sizes[1] ;
            const movieSingle = values[1].data.results.map(
                (function (movie, index) {
                 
                    if(movie.backdrop_path !== null) {
                        imagePath = configPathSingle + movie.backdrop_path;
                    }
                    if(movie.id === videoSingleID){
                        return {
                            id: `${movie.id}`,
                            title: `${movie.title}`,
                            date: `${movie.release_date}`,
                            genre_ids: `${movie.genre_ids}`,
                            desc: `${movie.overview}`,
                            images: `${imagePath}`,
                            vote_average:`${movie.vote_average}`,
                        };    
                    }
                    return false;
                                      
                })
            )
            
            
            this.setState({
                isLoading: false,
                videoSingle:movieSingle,
                videoList: movieList
            });
        })
        .catch(function(error){
             console.log(error);
        });

    };
    
    
   
    

    _renderVideolSingle = () => {
        const {videoSingle} = this.state;
       
        const itemVideo = videoSingle.map((item, index) => {
            if(item) {
                return (
                    <CardSingle item={item} key={index} />
                );
            }
            return false;
        });
        return itemVideo;
    }
    
    _renderLayout=()=>{
        const {isLoading} = this.state;
        const {videoList} = this.state;
        const {videoSingle} = this.state;

        if (isLoading) return <Loading/>

        if(videoList.length > 0 || videoSingle.length > 0){
            return(
                <div className="w3_agile_featured_movies two">
                   {this._renderVideolSingle()}
                    
                    <div className="cleafix"></div>
                </div>
            )
        }else{
            return (
                <div className="text-center" style={{margin: '5rem 0'}}>Sorry, there are no item</div>
            )
        }
        
    }
    
    render() {
        return (
            <div className="section-movies">
                <h3 className="agile_w3_title">LATEST <span>TRAILER</span> </h3>
                <div className="tab_movies_agileinfo">
                    {this._renderLayout()}
                </div>
            </div>
        );
    }
}

