import React, {Component} from 'react';
import {getMovieList} from '../../Services';
import {getConfiguration} from '../../Services';
import Card from '../../Product/card';
import Loading from '../Loading';

export default class LatestMovie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
         
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
        window.initlOwlCarousel();
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
            resource: 'now_playing'
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
            
            // Change value totalItem
            const totalItem = 10;
            
            //Get video Now Playing
            /*const movielatest = this._getNowPlaying();
            movielatest.then(movie => {
                const mapMovielatest = movie.map( (result, index) => {
                    return result
                        
                })
                this.setState({
                    videoNowPlaying: mapMovielatest,
                });
               
            })*/
            
            //Get Genres
            //const getGenres = this._getCategory();
            
            const movieList = values[1].data.results.map(
                (function (movie, index) {
                    
                    if(movie.poster_path !== null) {
                        imagePath = configPath + movie.poster_path;
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
            
           
            
            this.setState({
                isLoading: false,
                videoList: movieList
            });
        })
        .catch(function(error){
             console.log(error);
        });

    };
    
    
   
    _renderVideolList = () => {
        const {videoList} = this.state;
        const {isLoading} = this.state;
        const {videoNowPlaying} = this.state;
        
        if (isLoading) return <Loading/>
        if(videoList.length > 0 ){
            const itemVideo=[];
            const resultVideo = videoList.map((item, index) => {
                if(item ) {
                    return <Card item={item} key={index} latest={videoNowPlaying} class_sfx="w3l-movie-gride-slider" />
                }
                return false;
            });
            itemVideo.push(
                <div key="0" className="wthree_agile-requested-movies ss-carousel owl-carousel owl-theme" data-dots="false" data-nav="true" data-margin="0" data-autoplay="false" data-autospeed="10000" data-speed="300" data-column1="6" data-column2="4" data-column3="2" data-column4="2" data-column5="1">
                    {resultVideo}
                </div>
            );

            return itemVideo;
        }else{
            return (
                <div className="text-center" style={{margin: '5rem 0'}}>Sorry, there are no item</div>
            )
        }
        
    }

    
    render() {
        return (
            <div className="section-movies ">
                <h3 className="agile_w3_title">LATEST  <span>Movies</span> </h3>
                <div className="w3_agile_latest_movies">
                    {this._renderVideolList()}    
                    <div className="cleafix"></div>
                   
                </div>
            </div>
        );
    }
}

