import React, {Component} from 'react';
import {getMovieList} from '../../Services';
import {getConfiguration} from '../../Services';
import Card from '../../Product/card';
import CardSingle from '../../Product/card-single';

export default class TopMovie extends Component {

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
            page: 1,
            apiName: 'movie',
            resource: 'upcoming'
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
            let imagePath = '/images/backdrop_sizes/745x400.png';
            
            // Change value videoSingleID
            const totalItem = 8;
            const videoSingleID = 496243;
            
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
                    
                    if(movie.backdrop_path !== null) {
                        imagePath = configPath + movie.backdrop_path;
                    }
                    
                    if(index < totalItem ){
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
    
    
   
    _renderVideolList = () => {
        const {videoList} = this.state;
        const {videoNowPlaying} = this.state;
        
        const itemVideo = videoList.map((item, index) => {
            if(item && videoNowPlaying.length > 0) {
                return (
                    <Card item={item} key={index} latest={videoNowPlaying} />
                );
            }
            return false;
        });
        return itemVideo;
    }

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
    
    render() {
        return (
            <div className="top_movies">
                <h3 className="agile_w3_title">Top<span>Movies</span> </h3>
                <div className="tab_movies_agileinfo">
                    <div className="w3_agile_featured_movies two">
                        <div className="col-md-7 wthree_agile-movies_list second-top">
                            {this._renderVideolList()}    
                        </div>
                        <div className="col-md-5 video_agile_player second-top">
                            {this._renderVideolSingle()}
                        </div>
                        
                        <div className="cleafix"></div>
                    </div>
                </div>
            </div>
        );
    }
}

